/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type LoginRequest = WpRequest & {
    name?: string;
    password?: string;
};

export type WpRequest = object;

export type LoginResponse = WpResponse & {
    /** @format int32 */
    customErrorCode?: number;
    name?: string;
    password?: string;
};

export interface WpResponse {
    /** @format int32 */
    customErrorCode?: number;
}

export type JoinRequest = WpRequest & {
    name?: string;
    password?: string;
};

export type JoinResponse = WpResponse & {
    /** @format int32 */
    customErrorCode?: number;
    name?: string;
    password?: string;
};
