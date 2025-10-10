package com.project.wp_api.utility;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;

public class HttpUtils {

    public static void PrintHttpRequest(HttpServletRequest request) {

        try {
            var stringBuilder = new StringBuilder();

            // Start line
            stringBuilder.append("=============== Start line ===============\n");

            stringBuilder.append(request.getMethod()).append(' ');
            stringBuilder.append(request.getRequestURI()).append(' ');
            stringBuilder.append(request.getProtocol()).append('\n');

            // Param
            stringBuilder.append("=============== Parameters ===============\n");

            var parameterMap = request.getParameterMap();
            for(var key : parameterMap.keySet()) {
                stringBuilder.append(key).append(": ");

                var values = parameterMap.get(key);
                for(var i=0; i<values.length; i++) {
                    stringBuilder.append(values[i]);
                    if(i < values.length - 1) {
                        stringBuilder.append(',');
                    }
                }

                stringBuilder.append('\n');
            }

            // Header
            stringBuilder.append("================ Headers =================\n");

            var headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                var name = headerNames.nextElement();
                var value = request.getHeader(name);

                stringBuilder.append(name).append(": ").append(value).append('\n');
            }

            // Body
            stringBuilder.append("================== Body ==================\n");

            var reader = request.getReader();
            var line = "";
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line).append('\n');
            }

            stringBuilder.append("==========================================\n");

            System.out.println(stringBuilder.toString());
        }
        catch(IOException exception) {
            System.out.println(exception.toString());
        }
    }
}
