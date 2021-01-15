// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {AppSchema, appSchema} from '@nozbe/watermelondb';

import {
    ChannelInfoSchema,
    ChannelMembershipSchema,
    ChannelSchema,
    CustomEmojiSchema,
    DraftSchema,
    FileSchema,
    GroupMembershipSchema,
    GroupSchema,
    GroupsInChannelSchema,
    GroupsInTeamSchema,
    MyChannelSchema,
    MyChannelSettingsSchema,
    MyTeamSchema,
    PostInThreadSchema,
    PostMetadataSchema,
    PostSchema,
    PostsInChannelSchema,
    PreferenceSchema,
    ReactionSchema,
    RoleSchema,
    SlashCommandSchema,
    SystemSchema,
    TeamChannelHistorySchema,
    TeamMembershipSchema,
    TeamSchema,
    TeamSearchHistorySchema,
    TermsOfServiceSchema,
    UserSchema,
} from './table_schemas';

export const serverSchema: AppSchema = appSchema({
    version: 1,
    tables: [
        ChannelInfoSchema,
        ChannelMembershipSchema,
        ChannelSchema,
        CustomEmojiSchema,
        DraftSchema,
        FileSchema,
        GroupMembershipSchema,
        GroupSchema,
        GroupsInChannelSchema,
        GroupsInTeamSchema,
        MyChannelSchema,
        MyChannelSettingsSchema,
        MyTeamSchema,
        PostsInChannelSchema,
        PostInThreadSchema,
        PostMetadataSchema,
        PostSchema,
        PreferenceSchema,
        ReactionSchema,
        RoleSchema,
        SlashCommandSchema,
        SystemSchema,
        TeamChannelHistorySchema,
        TeamMembershipSchema,
        TeamSchema,
        TeamSearchHistorySchema,
        TermsOfServiceSchema,
        UserSchema,
    ],
});
