/*
 * DBeaver - Universal Database Manager
 * Copyright (C) 2010-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.cloudbeaver.service;

import io.cloudbeaver.DBWebException;
import io.cloudbeaver.WebObjectId;
import io.cloudbeaver.model.WebConnectionConfig;
import io.cloudbeaver.model.WebConnectionInfo;
import io.cloudbeaver.model.WebPropertyInfo;
import io.cloudbeaver.model.session.WebSession;
import org.jkiss.code.NotNull;
import org.jkiss.code.Nullable;

import java.util.Map;

public interface ConnectionController {

    WebConnectionInfo createConnection(
        @NotNull WebSession webSession,
        @Nullable @WebObjectId String projectId,
        @NotNull WebConnectionConfig connectionConfig
    ) throws DBWebException;

    WebConnectionInfo updateConnection(
        @NotNull WebSession webSession,
        @Nullable @WebObjectId String projectId,
        @NotNull WebConnectionConfig connectionConfig) throws DBWebException;

    boolean deleteConnection(
        @NotNull WebSession webSession,
        @Nullable @WebObjectId String projectId,
        @NotNull String connectionId) throws DBWebException;

    WebPropertyInfo[] getExternalInfo(WebSession webSession);
}
