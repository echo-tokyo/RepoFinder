import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IRepo } from './repo'
import { SerializedError } from '@reduxjs/toolkit'

export interface IQuery {
  data?: IRepo[]
  isError: boolean
  error?: FetchBaseQueryError | SerializedError | undefined
  isFetching: boolean
}

export interface IUserQuery {
  data?: IUserData,
  isSuccess: boolean
}

export interface IUserData {
  public_repos: number
}