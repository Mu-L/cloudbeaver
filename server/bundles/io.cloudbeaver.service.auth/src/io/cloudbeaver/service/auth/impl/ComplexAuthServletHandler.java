/*
 * DBeaver - Universal Database Manager
 * Copyright (C) 2010-2025 DBeaver Corp and others
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
package io.cloudbeaver.service.auth.impl;

import io.cloudbeaver.model.session.WebSession;
import io.cloudbeaver.server.WebAppUtils;
import io.cloudbeaver.service.DBWServletHandler;
import io.cloudbeaver.utils.ServletAppUtils;
import jakarta.servlet.Servlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jkiss.dbeaver.DBException;
import org.jkiss.utils.CommonUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ComplexAuthServletHandler implements DBWServletHandler {
    private static final String URI_PREFIX = "auth-complex";
    private static final String COMPLEX_AUTH_PARAMS = "cb.auth.complex.params";
    private static final String PARAM_REDIRECT_URI = "redirect_uri";
    private static final String PARAM_STATE = "state";
    private static final String PARAM_CODE_CHALLENGE = "code_challenge";


    @Override
    public boolean handleRequest(Servlet servlet, HttpServletRequest request, HttpServletResponse response) throws DBException, IOException {
        if (!URI_PREFIX.equals(ServletAppUtils.removeSideSlashes(request.getServletPath()))) {
            return false;
        }
        WebSession session = WebAppUtils.getWebApplication().getSessionManager().getWebSession(request, response, false);
        Map<String, Object> params = new HashMap<>();
        params.put(PARAM_REDIRECT_URI, request.getParameter(PARAM_REDIRECT_URI));
        params.put(PARAM_STATE, request.getParameter(PARAM_STATE));
        params.put(PARAM_CODE_CHALLENGE, request.getParameter(PARAM_CODE_CHALLENGE));
        session.setAttribute(COMPLEX_AUTH_PARAMS, params);
        String redirectUrl = Stream.of(ServletAppUtils.getServletApplication().getRootURI(),
                "/#/auth-complex")
            .map(ServletAppUtils::removeSideSlashes)
            .filter(CommonUtils::isNotEmpty)
            .collect(Collectors.joining("/"));
        response.sendRedirect(redirectUrl);
        return true;
    }
}
