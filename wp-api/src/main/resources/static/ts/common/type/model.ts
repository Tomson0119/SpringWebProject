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

export enum CustomErrorCode {
    UNDEFINED = "UNDEFINED",
    MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND",
    INVALID_PASSWORD = "INVALID_PASSWORD",
    DUPLICATED_MEMBER_NAME = "DUPLICATED_MEMBER_NAME",
}

export type LoginRequest = WpRequest & {
    name?: string;
    password?: string;
};

export type WpRequest = any;

export type LoginResponse = WpResponse;

export type WpResponse = any;

export type JoinRequest = WpRequest & {
    name?: string;
    password?: string;
};

export type JoinResponse = WpResponse & {
    /** @format int64 */
    memberId?: number;
    memberName?: string;
};

export type WpErrorResponse = WpResponse & {
    customErrorCode?: CustomErrorCode;
    errorMessage?: string;
};
