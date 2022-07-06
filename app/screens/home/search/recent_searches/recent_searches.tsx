// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {FlatList, View} from 'react-native';
import Animated from 'react-native-reanimated';

import FormattedText from '@components/formatted_text';
import {useTheme} from '@context/theme';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import {typography} from '@utils/typography';

import RecentItem from './recent_item';

import type TeamSearchHistoryModel from '@typings/database/models/servers/team_search_history';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const getStyleFromTheme = makeStyleSheetFromTheme((theme) => {
    return {
        divider: {
            backgroundColor: changeOpacity(theme.centerChannelColor, 0.08),
            height: 1,
            marginVertical: 15,
            marginHorizontal: 15,
        },
        title: {
            paddingHorizontal: 20,
            paddingVertical: 12,
            color: theme.centerChannelColor,
            ...typography('Heading', 300, 'SemiBold'),
        },
    };
});

type Props = {
    setRecentValue: (value: string) => void;
    recentSearches: TeamSearchHistoryModel[];
}

const RecentSearches = ({setRecentValue, recentSearches}: Props) => {
    const theme = useTheme();
    const intl = useIntl();
    const formatMessage = intl.formatMessage;
    const styles = getStyleFromTheme(theme);

    const renderRecentItem = useCallback(({item}) => {
        return (
            <RecentItem
                item={item}
                setRecentValue={setRecentValue}
            />
        );
    }, [setRecentValue]);

    const renderHeader = () => {
        return (
            <>
                <View style={styles.divider}/>
                <FormattedText
                    style={styles.title}
                    id={'screen.search.recent.header'}
                    defaultMessage={formatMessage({id: 'mobile.search.recent_title', defaultMessage: 'Recent searches'})}
                />
            </>
        );
    };

    return (
        <AnimatedFlatList
            data={recentSearches}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode='interactive'
            ListHeaderComponent={renderHeader}
            renderItem={renderRecentItem}
            scrollEventThrottle={60}
            testID='search.recents_list'
            removeClippedSubviews={true}
        />
    );
};

export default RecentSearches;
