// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import CopyChannelLinkOption from '@components/channel_actions/copy_channel_link_option';
import {General} from '@constants';

import EditChannel from './edit_channel';
import IgnoreMentions from './ignore_mentions';
import Members from './members';
import NotificationPreference from './notification_preference';
import PinnedMessages from './pinned_messages';

type Props = {
    channelId: string;
    type?: ChannelType;
    callsEnabled: boolean;
}

const Options = ({channelId, type, callsEnabled}: Props) => {
    return (
        <>
            {type !== General.DM_CHANNEL &&
                <IgnoreMentions channelId={channelId}/>
            }
            <NotificationPreference channelId={channelId}/>
            <PinnedMessages channelId={channelId}/>
            {type !== General.DM_CHANNEL &&
                <Members channelId={channelId}/>
            }
            {callsEnabled &&
                <CopyChannelLinkOption channelId={channelId}/>
            }
            {type !== General.DM_CHANNEL && type !== General.GM_CHANNEL &&
                <EditChannel channelId={channelId}/>
            }
        </>
    );
};

export default Options;