// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Database} from '@nozbe/watermelondb';

import DataOperator from '@database/operator/data_operator';
import DatabaseManager from '@database/manager';
import DatabaseConnectionException from '@database/exceptions/database_connection_exception';

export const createDataOperator = async (serverUrl: string) => {
    // Retrieves the connection matching serverUrl
    const connections = await DatabaseManager.retrieveDatabaseInstances([
        serverUrl,
    ]);

    if (connections?.length) {
    // finds the connection that corresponds to the serverUrl value
        const index = connections.findIndex((connection) => {
            return connection.url === serverUrl;
        });

        if (!connections?.[index]?.dbInstance) {
            throw new DatabaseConnectionException(
                `An instance of a database connection was found but we could not create a connection out of it for url: ${serverUrl}`,
            );
        }

        const connection = connections[index].dbInstance as Database;

        return new DataOperator(connection);
    }

    throw new DatabaseConnectionException(
        `No database has been registered with this url: ${serverUrl}`,
    );
};