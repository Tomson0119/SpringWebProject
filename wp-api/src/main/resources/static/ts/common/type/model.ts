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
  DUPLICATED_MEMBER_EMAIL = "DUPLICATED_MEMBER_EMAIL",
}

export interface JoinRequest {
  name?: string;
  emailAddress?: string;
  password?: string;
}

export interface JoinResponse {
  /** @format int64 */
  memberId?: number;
  memberName?: string;
}

export interface LoginRequest {
  name?: string;
  password?: string;
}

export interface FindMemberResponse {
  /** @format int64 */
  memberId?: number;
  memberName?: string;
}

export interface WpErrorResponse {
  customErrorCode?: CustomErrorCode;
  errorMessage?: string;
}
