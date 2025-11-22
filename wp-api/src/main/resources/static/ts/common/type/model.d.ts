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

/** CustomErrorCode */
export enum CustomErrorCode {
  TEST_01 = "TEST_01",
  TEST_02 = "TEST_02",
}

export type LoginRequest = WpRequest & {
  name?: string;
  password?: string;
};

export type WpRequest = any;

export type LoginResponse = WpResponse & {
  name?: string;
  password?: string;
};

export type WpResponse = any;

export type JoinRequest = WpRequest & {
  name?: string;
  password?: string;
};

export type JoinResponse = WpResponse & {
  name?: string;
  password?: string;
};

export interface WpErrorResponse {
  /** CustomErrorCode */
  customErrorCode?: CustomErrorCode;
  errorMessage?: string;
}
