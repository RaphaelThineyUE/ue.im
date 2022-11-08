// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {handleBindingClick, postEphemeralCallResponseForPost} from '@actions/remote/apps';
import {handleGotoLocation} from '@actions/remote/command';
import OptionItem from '@app/components/option_item';
import {AppBindingLocations, AppCallResponseTypes} from '@app/constants/apps';
import AppsManager from '@app/managers/apps_manager';
import {observeCurrentTeamId} from '@app/queries/servers/system';
import {createCallContext} from '@app/utils/apps';
import {preventDoubleTap} from '@app/utils/tap';
import {Screens} from '@constants';
import {dismissBottomSheet, showAppForm} from '@screens/navigation';
import {WithDatabaseArgs} from '@typings/database/database';

import type PostModel from '@typings/database/models/servers/post';

type Props = {
    bindings: AppBinding[];
    post: PostModel;
    serverUrl: string;
    teamId: string;
}
const AppBindingsPostOptions = ({serverUrl, post, teamId, bindings}: Props) => {
    const intl = useIntl();

    const onPress = useCallback(async (binding: AppBinding) => {
        await dismissBottomSheet(Screens.POST_OPTIONS);

        const context = createCallContext(
            binding.app_id,
            binding.location,
            post.channelId,
            teamId,
            post.id,
            post.rootId || post.id,
        );

        const res = await handleBindingClick(serverUrl, binding, context, intl);
        if (res.error) {
            const errorResponse = res.error;
            const errorMessage = errorResponse.text || intl.formatMessage({
                id: 'apps.error.unknown',
                defaultMessage: 'Unknown error occurred.',
            });
            postEphemeralCallResponseForPost(serverUrl, errorResponse, errorMessage, post);
            return;
        }

        const callResp = res.data!;
        switch (callResp.type) {
            case AppCallResponseTypes.OK:
                if (callResp.text) {
                    postEphemeralCallResponseForPost(serverUrl, callResp, callResp.text, post);
                }
                return;
            case AppCallResponseTypes.NAVIGATE:
                if (callResp.navigate_to_url) {
                    handleGotoLocation(serverUrl, intl, callResp.navigate_to_url);
                }
                return;
            case AppCallResponseTypes.FORM:
                if (callResp.form) {
                    showAppForm(callResp.form, context);
                }
                return;
            default: {
                const errorMessage = intl.formatMessage({
                    id: 'apps.error.responses.unknown_type',
                    defaultMessage: 'App response type not supported. Response type: {type}.',
                }, {
                    type: callResp.type,
                });
                postEphemeralCallResponseForPost(serverUrl, callResp, errorMessage, post);
            }
        }
    }, [bindings, post, serverUrl, teamId, intl]);

    const options = bindings.map((binding) => (
        <OptionItem
            key={binding.location}
            label={binding.label}
            icon={binding.icon}
            action={preventDoubleTap(() => onPress(binding))}
            type='default'
            testID={`post_options.app_binding.option.${binding.location}`}
        />
    ));

    return <>{options}</>;
};

type OwnProps = {
    post: PostModel;
    serverUrl: string;
}

const enhanced = withObservables([], (ownProps: WithDatabaseArgs & OwnProps) => {
    const {database} = ownProps;
    const teamId = observeCurrentTeamId(database);

    const bindings = AppsManager.observeBindings(ownProps.serverUrl, AppBindingLocations.POST_MENU_ITEM);

    return {
        teamId,
        bindings,
    };
});

export default React.memo(withDatabase(enhanced(AppBindingsPostOptions)));