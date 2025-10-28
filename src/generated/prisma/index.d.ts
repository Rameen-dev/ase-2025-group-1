
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model EmailVerificationTokens
 * 
 */
export type EmailVerificationTokens = $Result.DefaultSelection<Prisma.$EmailVerificationTokensPayload>
/**
 * Model PasswordResetTokens
 * 
 */
export type PasswordResetTokens = $Result.DefaultSelection<Prisma.$PasswordResetTokensPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailVerificationTokens`: Exposes CRUD operations for the **EmailVerificationTokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailVerificationTokens
    * const emailVerificationTokens = await prisma.emailVerificationTokens.findMany()
    * ```
    */
  get emailVerificationTokens(): Prisma.EmailVerificationTokensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetTokens`: Exposes CRUD operations for the **PasswordResetTokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetTokens.findMany()
    * ```
    */
  get passwordResetTokens(): Prisma.PasswordResetTokensDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    EmailVerificationTokens: 'EmailVerificationTokens',
    PasswordResetTokens: 'PasswordResetTokens'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "emailVerificationTokens" | "passwordResetTokens"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      EmailVerificationTokens: {
        payload: Prisma.$EmailVerificationTokensPayload<ExtArgs>
        fields: Prisma.EmailVerificationTokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailVerificationTokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailVerificationTokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>
          }
          findFirst: {
            args: Prisma.EmailVerificationTokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailVerificationTokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>
          }
          findMany: {
            args: Prisma.EmailVerificationTokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>[]
          }
          create: {
            args: Prisma.EmailVerificationTokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>
          }
          createMany: {
            args: Prisma.EmailVerificationTokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailVerificationTokensCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>[]
          }
          delete: {
            args: Prisma.EmailVerificationTokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>
          }
          update: {
            args: Prisma.EmailVerificationTokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>
          }
          deleteMany: {
            args: Prisma.EmailVerificationTokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailVerificationTokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailVerificationTokensUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>[]
          }
          upsert: {
            args: Prisma.EmailVerificationTokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationTokensPayload>
          }
          aggregate: {
            args: Prisma.EmailVerificationTokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailVerificationTokens>
          }
          groupBy: {
            args: Prisma.EmailVerificationTokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationTokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailVerificationTokensCountArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationTokensCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetTokens: {
        payload: Prisma.$PasswordResetTokensPayload<ExtArgs>
        fields: Prisma.PasswordResetTokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokensCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>
          }
          update: {
            args: Prisma.PasswordResetTokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokensUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokensPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetTokens>
          }
          groupBy: {
            args: Prisma.PasswordResetTokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokensCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokensCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    emailVerificationTokens?: EmailVerificationTokensOmit
    passwordResetTokens?: PasswordResetTokensOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    EmailVerificationTokens: number
    PasswordResetTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    EmailVerificationTokens?: boolean | UserCountOutputTypeCountEmailVerificationTokensArgs
    PasswordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailVerificationTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationTokensWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokensWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    email: string | null
    password_hash: string | null
    role: string | null
    is_verified: boolean | null
    first_name: string | null
    last_name: string | null
    created_on: Date | null
    updated_on: Date | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    email: string | null
    password_hash: string | null
    role: string | null
    is_verified: boolean | null
    first_name: string | null
    last_name: string | null
    created_on: Date | null
    updated_on: Date | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    email: number
    password_hash: number
    role: number
    is_verified: number
    first_name: number
    last_name: number
    created_on: number
    updated_on: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    role?: true
    is_verified?: true
    first_name?: true
    last_name?: true
    created_on?: true
    updated_on?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    role?: true
    is_verified?: true
    first_name?: true
    last_name?: true
    created_on?: true
    updated_on?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    role?: true
    is_verified?: true
    first_name?: true
    last_name?: true
    created_on?: true
    updated_on?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on: Date
    updated_on: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    is_verified?: boolean
    first_name?: boolean
    last_name?: boolean
    created_on?: boolean
    updated_on?: boolean
    EmailVerificationTokens?: boolean | User$EmailVerificationTokensArgs<ExtArgs>
    PasswordResetTokens?: boolean | User$PasswordResetTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    is_verified?: boolean
    first_name?: boolean
    last_name?: boolean
    created_on?: boolean
    updated_on?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    is_verified?: boolean
    first_name?: boolean
    last_name?: boolean
    created_on?: boolean
    updated_on?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    is_verified?: boolean
    first_name?: boolean
    last_name?: boolean
    created_on?: boolean
    updated_on?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "email" | "password_hash" | "role" | "is_verified" | "first_name" | "last_name" | "created_on" | "updated_on", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    EmailVerificationTokens?: boolean | User$EmailVerificationTokensArgs<ExtArgs>
    PasswordResetTokens?: boolean | User$PasswordResetTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      EmailVerificationTokens: Prisma.$EmailVerificationTokensPayload<ExtArgs>[]
      PasswordResetTokens: Prisma.$PasswordResetTokensPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      email: string
      password_hash: string
      role: string
      is_verified: boolean
      first_name: string
      last_name: string
      created_on: Date
      updated_on: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    EmailVerificationTokens<T extends User$EmailVerificationTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$EmailVerificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PasswordResetTokens<T extends User$PasswordResetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$PasswordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly is_verified: FieldRef<"User", 'Boolean'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly created_on: FieldRef<"User", 'DateTime'>
    readonly updated_on: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.EmailVerificationTokens
   */
  export type User$EmailVerificationTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    where?: EmailVerificationTokensWhereInput
    orderBy?: EmailVerificationTokensOrderByWithRelationInput | EmailVerificationTokensOrderByWithRelationInput[]
    cursor?: EmailVerificationTokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailVerificationTokensScalarFieldEnum | EmailVerificationTokensScalarFieldEnum[]
  }

  /**
   * User.PasswordResetTokens
   */
  export type User$PasswordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    where?: PasswordResetTokensWhereInput
    orderBy?: PasswordResetTokensOrderByWithRelationInput | PasswordResetTokensOrderByWithRelationInput[]
    cursor?: PasswordResetTokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokensScalarFieldEnum | PasswordResetTokensScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model EmailVerificationTokens
   */

  export type AggregateEmailVerificationTokens = {
    _count: EmailVerificationTokensCountAggregateOutputType | null
    _avg: EmailVerificationTokensAvgAggregateOutputType | null
    _sum: EmailVerificationTokensSumAggregateOutputType | null
    _min: EmailVerificationTokensMinAggregateOutputType | null
    _max: EmailVerificationTokensMaxAggregateOutputType | null
  }

  export type EmailVerificationTokensAvgAggregateOutputType = {
    ev_token_id: number | null
    user_id: number | null
  }

  export type EmailVerificationTokensSumAggregateOutputType = {
    ev_token_id: number | null
    user_id: number | null
  }

  export type EmailVerificationTokensMinAggregateOutputType = {
    ev_token_id: number | null
    user_id: number | null
    token: string | null
    expires_on: Date | null
    consumed_on: Date | null
    created_on: Date | null
  }

  export type EmailVerificationTokensMaxAggregateOutputType = {
    ev_token_id: number | null
    user_id: number | null
    token: string | null
    expires_on: Date | null
    consumed_on: Date | null
    created_on: Date | null
  }

  export type EmailVerificationTokensCountAggregateOutputType = {
    ev_token_id: number
    user_id: number
    token: number
    expires_on: number
    consumed_on: number
    created_on: number
    _all: number
  }


  export type EmailVerificationTokensAvgAggregateInputType = {
    ev_token_id?: true
    user_id?: true
  }

  export type EmailVerificationTokensSumAggregateInputType = {
    ev_token_id?: true
    user_id?: true
  }

  export type EmailVerificationTokensMinAggregateInputType = {
    ev_token_id?: true
    user_id?: true
    token?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
  }

  export type EmailVerificationTokensMaxAggregateInputType = {
    ev_token_id?: true
    user_id?: true
    token?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
  }

  export type EmailVerificationTokensCountAggregateInputType = {
    ev_token_id?: true
    user_id?: true
    token?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
    _all?: true
  }

  export type EmailVerificationTokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerificationTokens to aggregate.
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokensOrderByWithRelationInput | EmailVerificationTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailVerificationTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailVerificationTokens
    **/
    _count?: true | EmailVerificationTokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailVerificationTokensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailVerificationTokensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailVerificationTokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailVerificationTokensMaxAggregateInputType
  }

  export type GetEmailVerificationTokensAggregateType<T extends EmailVerificationTokensAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailVerificationTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailVerificationTokens[P]>
      : GetScalarType<T[P], AggregateEmailVerificationTokens[P]>
  }




  export type EmailVerificationTokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationTokensWhereInput
    orderBy?: EmailVerificationTokensOrderByWithAggregationInput | EmailVerificationTokensOrderByWithAggregationInput[]
    by: EmailVerificationTokensScalarFieldEnum[] | EmailVerificationTokensScalarFieldEnum
    having?: EmailVerificationTokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailVerificationTokensCountAggregateInputType | true
    _avg?: EmailVerificationTokensAvgAggregateInputType
    _sum?: EmailVerificationTokensSumAggregateInputType
    _min?: EmailVerificationTokensMinAggregateInputType
    _max?: EmailVerificationTokensMaxAggregateInputType
  }

  export type EmailVerificationTokensGroupByOutputType = {
    ev_token_id: number
    user_id: number
    token: string
    expires_on: Date
    consumed_on: Date | null
    created_on: Date
    _count: EmailVerificationTokensCountAggregateOutputType | null
    _avg: EmailVerificationTokensAvgAggregateOutputType | null
    _sum: EmailVerificationTokensSumAggregateOutputType | null
    _min: EmailVerificationTokensMinAggregateOutputType | null
    _max: EmailVerificationTokensMaxAggregateOutputType | null
  }

  type GetEmailVerificationTokensGroupByPayload<T extends EmailVerificationTokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailVerificationTokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailVerificationTokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailVerificationTokensGroupByOutputType[P]>
            : GetScalarType<T[P], EmailVerificationTokensGroupByOutputType[P]>
        }
      >
    >


  export type EmailVerificationTokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ev_token_id?: boolean
    user_id?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerificationTokens"]>

  export type EmailVerificationTokensSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ev_token_id?: boolean
    user_id?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerificationTokens"]>

  export type EmailVerificationTokensSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ev_token_id?: boolean
    user_id?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailVerificationTokens"]>

  export type EmailVerificationTokensSelectScalar = {
    ev_token_id?: boolean
    user_id?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
  }

  export type EmailVerificationTokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ev_token_id" | "user_id" | "token" | "expires_on" | "consumed_on" | "created_on", ExtArgs["result"]["emailVerificationTokens"]>
  export type EmailVerificationTokensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailVerificationTokensIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailVerificationTokensIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailVerificationTokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailVerificationTokens"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ev_token_id: number
      user_id: number
      token: string
      expires_on: Date
      consumed_on: Date | null
      created_on: Date
    }, ExtArgs["result"]["emailVerificationTokens"]>
    composites: {}
  }

  type EmailVerificationTokensGetPayload<S extends boolean | null | undefined | EmailVerificationTokensDefaultArgs> = $Result.GetResult<Prisma.$EmailVerificationTokensPayload, S>

  type EmailVerificationTokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailVerificationTokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailVerificationTokensCountAggregateInputType | true
    }

  export interface EmailVerificationTokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailVerificationTokens'], meta: { name: 'EmailVerificationTokens' } }
    /**
     * Find zero or one EmailVerificationTokens that matches the filter.
     * @param {EmailVerificationTokensFindUniqueArgs} args - Arguments to find a EmailVerificationTokens
     * @example
     * // Get one EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailVerificationTokensFindUniqueArgs>(args: SelectSubset<T, EmailVerificationTokensFindUniqueArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailVerificationTokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailVerificationTokensFindUniqueOrThrowArgs} args - Arguments to find a EmailVerificationTokens
     * @example
     * // Get one EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailVerificationTokensFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailVerificationTokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensFindFirstArgs} args - Arguments to find a EmailVerificationTokens
     * @example
     * // Get one EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailVerificationTokensFindFirstArgs>(args?: SelectSubset<T, EmailVerificationTokensFindFirstArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerificationTokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensFindFirstOrThrowArgs} args - Arguments to find a EmailVerificationTokens
     * @example
     * // Get one EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailVerificationTokensFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailVerificationTokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailVerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.findMany()
     * 
     * // Get first 10 EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.findMany({ take: 10 })
     * 
     * // Only select the `ev_token_id`
     * const emailVerificationTokensWithEv_token_idOnly = await prisma.emailVerificationTokens.findMany({ select: { ev_token_id: true } })
     * 
     */
    findMany<T extends EmailVerificationTokensFindManyArgs>(args?: SelectSubset<T, EmailVerificationTokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailVerificationTokens.
     * @param {EmailVerificationTokensCreateArgs} args - Arguments to create a EmailVerificationTokens.
     * @example
     * // Create one EmailVerificationTokens
     * const EmailVerificationTokens = await prisma.emailVerificationTokens.create({
     *   data: {
     *     // ... data to create a EmailVerificationTokens
     *   }
     * })
     * 
     */
    create<T extends EmailVerificationTokensCreateArgs>(args: SelectSubset<T, EmailVerificationTokensCreateArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailVerificationTokens.
     * @param {EmailVerificationTokensCreateManyArgs} args - Arguments to create many EmailVerificationTokens.
     * @example
     * // Create many EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailVerificationTokensCreateManyArgs>(args?: SelectSubset<T, EmailVerificationTokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailVerificationTokens and returns the data saved in the database.
     * @param {EmailVerificationTokensCreateManyAndReturnArgs} args - Arguments to create many EmailVerificationTokens.
     * @example
     * // Create many EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailVerificationTokens and only return the `ev_token_id`
     * const emailVerificationTokensWithEv_token_idOnly = await prisma.emailVerificationTokens.createManyAndReturn({
     *   select: { ev_token_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailVerificationTokensCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailVerificationTokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailVerificationTokens.
     * @param {EmailVerificationTokensDeleteArgs} args - Arguments to delete one EmailVerificationTokens.
     * @example
     * // Delete one EmailVerificationTokens
     * const EmailVerificationTokens = await prisma.emailVerificationTokens.delete({
     *   where: {
     *     // ... filter to delete one EmailVerificationTokens
     *   }
     * })
     * 
     */
    delete<T extends EmailVerificationTokensDeleteArgs>(args: SelectSubset<T, EmailVerificationTokensDeleteArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailVerificationTokens.
     * @param {EmailVerificationTokensUpdateArgs} args - Arguments to update one EmailVerificationTokens.
     * @example
     * // Update one EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailVerificationTokensUpdateArgs>(args: SelectSubset<T, EmailVerificationTokensUpdateArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailVerificationTokens.
     * @param {EmailVerificationTokensDeleteManyArgs} args - Arguments to filter EmailVerificationTokens to delete.
     * @example
     * // Delete a few EmailVerificationTokens
     * const { count } = await prisma.emailVerificationTokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailVerificationTokensDeleteManyArgs>(args?: SelectSubset<T, EmailVerificationTokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailVerificationTokensUpdateManyArgs>(args: SelectSubset<T, EmailVerificationTokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerificationTokens and returns the data updated in the database.
     * @param {EmailVerificationTokensUpdateManyAndReturnArgs} args - Arguments to update many EmailVerificationTokens.
     * @example
     * // Update many EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailVerificationTokens and only return the `ev_token_id`
     * const emailVerificationTokensWithEv_token_idOnly = await prisma.emailVerificationTokens.updateManyAndReturn({
     *   select: { ev_token_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailVerificationTokensUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailVerificationTokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailVerificationTokens.
     * @param {EmailVerificationTokensUpsertArgs} args - Arguments to update or create a EmailVerificationTokens.
     * @example
     * // Update or create a EmailVerificationTokens
     * const emailVerificationTokens = await prisma.emailVerificationTokens.upsert({
     *   create: {
     *     // ... data to create a EmailVerificationTokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailVerificationTokens we want to update
     *   }
     * })
     */
    upsert<T extends EmailVerificationTokensUpsertArgs>(args: SelectSubset<T, EmailVerificationTokensUpsertArgs<ExtArgs>>): Prisma__EmailVerificationTokensClient<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensCountArgs} args - Arguments to filter EmailVerificationTokens to count.
     * @example
     * // Count the number of EmailVerificationTokens
     * const count = await prisma.emailVerificationTokens.count({
     *   where: {
     *     // ... the filter for the EmailVerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends EmailVerificationTokensCountArgs>(
      args?: Subset<T, EmailVerificationTokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailVerificationTokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailVerificationTokensAggregateArgs>(args: Subset<T, EmailVerificationTokensAggregateArgs>): Prisma.PrismaPromise<GetEmailVerificationTokensAggregateType<T>>

    /**
     * Group by EmailVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationTokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailVerificationTokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailVerificationTokensGroupByArgs['orderBy'] }
        : { orderBy?: EmailVerificationTokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailVerificationTokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailVerificationTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailVerificationTokens model
   */
  readonly fields: EmailVerificationTokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailVerificationTokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailVerificationTokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailVerificationTokens model
   */
  interface EmailVerificationTokensFieldRefs {
    readonly ev_token_id: FieldRef<"EmailVerificationTokens", 'Int'>
    readonly user_id: FieldRef<"EmailVerificationTokens", 'Int'>
    readonly token: FieldRef<"EmailVerificationTokens", 'String'>
    readonly expires_on: FieldRef<"EmailVerificationTokens", 'DateTime'>
    readonly consumed_on: FieldRef<"EmailVerificationTokens", 'DateTime'>
    readonly created_on: FieldRef<"EmailVerificationTokens", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailVerificationTokens findUnique
   */
  export type EmailVerificationTokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationTokens to fetch.
     */
    where: EmailVerificationTokensWhereUniqueInput
  }

  /**
   * EmailVerificationTokens findUniqueOrThrow
   */
  export type EmailVerificationTokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationTokens to fetch.
     */
    where: EmailVerificationTokensWhereUniqueInput
  }

  /**
   * EmailVerificationTokens findFirst
   */
  export type EmailVerificationTokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationTokens to fetch.
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokensOrderByWithRelationInput | EmailVerificationTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerificationTokens.
     */
    cursor?: EmailVerificationTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerificationTokens.
     */
    distinct?: EmailVerificationTokensScalarFieldEnum | EmailVerificationTokensScalarFieldEnum[]
  }

  /**
   * EmailVerificationTokens findFirstOrThrow
   */
  export type EmailVerificationTokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationTokens to fetch.
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokensOrderByWithRelationInput | EmailVerificationTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerificationTokens.
     */
    cursor?: EmailVerificationTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerificationTokens.
     */
    distinct?: EmailVerificationTokensScalarFieldEnum | EmailVerificationTokensScalarFieldEnum[]
  }

  /**
   * EmailVerificationTokens findMany
   */
  export type EmailVerificationTokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * Filter, which EmailVerificationTokens to fetch.
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerificationTokens to fetch.
     */
    orderBy?: EmailVerificationTokensOrderByWithRelationInput | EmailVerificationTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailVerificationTokens.
     */
    cursor?: EmailVerificationTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerificationTokens.
     */
    skip?: number
    distinct?: EmailVerificationTokensScalarFieldEnum | EmailVerificationTokensScalarFieldEnum[]
  }

  /**
   * EmailVerificationTokens create
   */
  export type EmailVerificationTokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailVerificationTokens.
     */
    data: XOR<EmailVerificationTokensCreateInput, EmailVerificationTokensUncheckedCreateInput>
  }

  /**
   * EmailVerificationTokens createMany
   */
  export type EmailVerificationTokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailVerificationTokens.
     */
    data: EmailVerificationTokensCreateManyInput | EmailVerificationTokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailVerificationTokens createManyAndReturn
   */
  export type EmailVerificationTokensCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * The data used to create many EmailVerificationTokens.
     */
    data: EmailVerificationTokensCreateManyInput | EmailVerificationTokensCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailVerificationTokens update
   */
  export type EmailVerificationTokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailVerificationTokens.
     */
    data: XOR<EmailVerificationTokensUpdateInput, EmailVerificationTokensUncheckedUpdateInput>
    /**
     * Choose, which EmailVerificationTokens to update.
     */
    where: EmailVerificationTokensWhereUniqueInput
  }

  /**
   * EmailVerificationTokens updateMany
   */
  export type EmailVerificationTokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailVerificationTokens.
     */
    data: XOR<EmailVerificationTokensUpdateManyMutationInput, EmailVerificationTokensUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerificationTokens to update
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * Limit how many EmailVerificationTokens to update.
     */
    limit?: number
  }

  /**
   * EmailVerificationTokens updateManyAndReturn
   */
  export type EmailVerificationTokensUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * The data used to update EmailVerificationTokens.
     */
    data: XOR<EmailVerificationTokensUpdateManyMutationInput, EmailVerificationTokensUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerificationTokens to update
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * Limit how many EmailVerificationTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailVerificationTokens upsert
   */
  export type EmailVerificationTokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailVerificationTokens to update in case it exists.
     */
    where: EmailVerificationTokensWhereUniqueInput
    /**
     * In case the EmailVerificationTokens found by the `where` argument doesn't exist, create a new EmailVerificationTokens with this data.
     */
    create: XOR<EmailVerificationTokensCreateInput, EmailVerificationTokensUncheckedCreateInput>
    /**
     * In case the EmailVerificationTokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailVerificationTokensUpdateInput, EmailVerificationTokensUncheckedUpdateInput>
  }

  /**
   * EmailVerificationTokens delete
   */
  export type EmailVerificationTokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
    /**
     * Filter which EmailVerificationTokens to delete.
     */
    where: EmailVerificationTokensWhereUniqueInput
  }

  /**
   * EmailVerificationTokens deleteMany
   */
  export type EmailVerificationTokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerificationTokens to delete
     */
    where?: EmailVerificationTokensWhereInput
    /**
     * Limit how many EmailVerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * EmailVerificationTokens without action
   */
  export type EmailVerificationTokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationTokens
     */
    select?: EmailVerificationTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerificationTokens
     */
    omit?: EmailVerificationTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailVerificationTokensInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetTokens
   */

  export type AggregatePasswordResetTokens = {
    _count: PasswordResetTokensCountAggregateOutputType | null
    _avg: PasswordResetTokensAvgAggregateOutputType | null
    _sum: PasswordResetTokensSumAggregateOutputType | null
    _min: PasswordResetTokensMinAggregateOutputType | null
    _max: PasswordResetTokensMaxAggregateOutputType | null
  }

  export type PasswordResetTokensAvgAggregateOutputType = {
    pr_token_id: number | null
    user_id: number | null
  }

  export type PasswordResetTokensSumAggregateOutputType = {
    pr_token_id: number | null
    user_id: number | null
  }

  export type PasswordResetTokensMinAggregateOutputType = {
    pr_token_id: number | null
    user_id: number | null
    code: string | null
    expires_on: Date | null
    consumed_on: Date | null
    created_on: Date | null
  }

  export type PasswordResetTokensMaxAggregateOutputType = {
    pr_token_id: number | null
    user_id: number | null
    code: string | null
    expires_on: Date | null
    consumed_on: Date | null
    created_on: Date | null
  }

  export type PasswordResetTokensCountAggregateOutputType = {
    pr_token_id: number
    user_id: number
    code: number
    expires_on: number
    consumed_on: number
    created_on: number
    _all: number
  }


  export type PasswordResetTokensAvgAggregateInputType = {
    pr_token_id?: true
    user_id?: true
  }

  export type PasswordResetTokensSumAggregateInputType = {
    pr_token_id?: true
    user_id?: true
  }

  export type PasswordResetTokensMinAggregateInputType = {
    pr_token_id?: true
    user_id?: true
    code?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
  }

  export type PasswordResetTokensMaxAggregateInputType = {
    pr_token_id?: true
    user_id?: true
    code?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
  }

  export type PasswordResetTokensCountAggregateInputType = {
    pr_token_id?: true
    user_id?: true
    code?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
    _all?: true
  }

  export type PasswordResetTokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to aggregate.
     */
    where?: PasswordResetTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokensOrderByWithRelationInput | PasswordResetTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PasswordResetTokensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PasswordResetTokensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokensMaxAggregateInputType
  }

  export type GetPasswordResetTokensAggregateType<T extends PasswordResetTokensAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetTokens[P]>
      : GetScalarType<T[P], AggregatePasswordResetTokens[P]>
  }




  export type PasswordResetTokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokensWhereInput
    orderBy?: PasswordResetTokensOrderByWithAggregationInput | PasswordResetTokensOrderByWithAggregationInput[]
    by: PasswordResetTokensScalarFieldEnum[] | PasswordResetTokensScalarFieldEnum
    having?: PasswordResetTokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokensCountAggregateInputType | true
    _avg?: PasswordResetTokensAvgAggregateInputType
    _sum?: PasswordResetTokensSumAggregateInputType
    _min?: PasswordResetTokensMinAggregateInputType
    _max?: PasswordResetTokensMaxAggregateInputType
  }

  export type PasswordResetTokensGroupByOutputType = {
    pr_token_id: number
    user_id: number
    code: string
    expires_on: Date
    consumed_on: Date | null
    created_on: Date
    _count: PasswordResetTokensCountAggregateOutputType | null
    _avg: PasswordResetTokensAvgAggregateOutputType | null
    _sum: PasswordResetTokensSumAggregateOutputType | null
    _min: PasswordResetTokensMinAggregateOutputType | null
    _max: PasswordResetTokensMaxAggregateOutputType | null
  }

  type GetPasswordResetTokensGroupByPayload<T extends PasswordResetTokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokensGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokensGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pr_token_id?: boolean
    user_id?: boolean
    code?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetTokens"]>

  export type PasswordResetTokensSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pr_token_id?: boolean
    user_id?: boolean
    code?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetTokens"]>

  export type PasswordResetTokensSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    pr_token_id?: boolean
    user_id?: boolean
    code?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetTokens"]>

  export type PasswordResetTokensSelectScalar = {
    pr_token_id?: boolean
    user_id?: boolean
    code?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
  }

  export type PasswordResetTokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"pr_token_id" | "user_id" | "code" | "expires_on" | "consumed_on" | "created_on", ExtArgs["result"]["passwordResetTokens"]>
  export type PasswordResetTokensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokensIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokensIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetTokens"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      pr_token_id: number
      user_id: number
      code: string
      expires_on: Date
      consumed_on: Date | null
      created_on: Date
    }, ExtArgs["result"]["passwordResetTokens"]>
    composites: {}
  }

  type PasswordResetTokensGetPayload<S extends boolean | null | undefined | PasswordResetTokensDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokensPayload, S>

  type PasswordResetTokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokensCountAggregateInputType | true
    }

  export interface PasswordResetTokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetTokens'], meta: { name: 'PasswordResetTokens' } }
    /**
     * Find zero or one PasswordResetTokens that matches the filter.
     * @param {PasswordResetTokensFindUniqueArgs} args - Arguments to find a PasswordResetTokens
     * @example
     * // Get one PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokensFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokensFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetTokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokensFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetTokens
     * @example
     * // Get one PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokensFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensFindFirstArgs} args - Arguments to find a PasswordResetTokens
     * @example
     * // Get one PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokensFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokensFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetTokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensFindFirstOrThrowArgs} args - Arguments to find a PasswordResetTokens
     * @example
     * // Get one PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokensFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.findMany({ take: 10 })
     * 
     * // Only select the `pr_token_id`
     * const passwordResetTokensWithPr_token_idOnly = await prisma.passwordResetTokens.findMany({ select: { pr_token_id: true } })
     * 
     */
    findMany<T extends PasswordResetTokensFindManyArgs>(args?: SelectSubset<T, PasswordResetTokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetTokens.
     * @param {PasswordResetTokensCreateArgs} args - Arguments to create a PasswordResetTokens.
     * @example
     * // Create one PasswordResetTokens
     * const PasswordResetTokens = await prisma.passwordResetTokens.create({
     *   data: {
     *     // ... data to create a PasswordResetTokens
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokensCreateArgs>(args: SelectSubset<T, PasswordResetTokensCreateArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokensCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokensCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokensCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `pr_token_id`
     * const passwordResetTokensWithPr_token_idOnly = await prisma.passwordResetTokens.createManyAndReturn({
     *   select: { pr_token_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokensCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetTokens.
     * @param {PasswordResetTokensDeleteArgs} args - Arguments to delete one PasswordResetTokens.
     * @example
     * // Delete one PasswordResetTokens
     * const PasswordResetTokens = await prisma.passwordResetTokens.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetTokens
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokensDeleteArgs>(args: SelectSubset<T, PasswordResetTokensDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetTokens.
     * @param {PasswordResetTokensUpdateArgs} args - Arguments to update one PasswordResetTokens.
     * @example
     * // Update one PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokensUpdateArgs>(args: SelectSubset<T, PasswordResetTokensUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokensDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetTokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokensDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokensUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokensUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `pr_token_id`
     * const passwordResetTokensWithPr_token_idOnly = await prisma.passwordResetTokens.updateManyAndReturn({
     *   select: { pr_token_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokensUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetTokens.
     * @param {PasswordResetTokensUpsertArgs} args - Arguments to update or create a PasswordResetTokens.
     * @example
     * // Update or create a PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetTokens.upsert({
     *   create: {
     *     // ... data to create a PasswordResetTokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokensUpsertArgs>(args: SelectSubset<T, PasswordResetTokensUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokensClient<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetTokens.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokensCountArgs>(
      args?: Subset<T, PasswordResetTokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokensAggregateArgs>(args: Subset<T, PasswordResetTokensAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokensAggregateType<T>>

    /**
     * Group by PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokensGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetTokens model
   */
  readonly fields: PasswordResetTokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetTokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetTokens model
   */
  interface PasswordResetTokensFieldRefs {
    readonly pr_token_id: FieldRef<"PasswordResetTokens", 'Int'>
    readonly user_id: FieldRef<"PasswordResetTokens", 'Int'>
    readonly code: FieldRef<"PasswordResetTokens", 'String'>
    readonly expires_on: FieldRef<"PasswordResetTokens", 'DateTime'>
    readonly consumed_on: FieldRef<"PasswordResetTokens", 'DateTime'>
    readonly created_on: FieldRef<"PasswordResetTokens", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetTokens findUnique
   */
  export type PasswordResetTokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where: PasswordResetTokensWhereUniqueInput
  }

  /**
   * PasswordResetTokens findUniqueOrThrow
   */
  export type PasswordResetTokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where: PasswordResetTokensWhereUniqueInput
  }

  /**
   * PasswordResetTokens findFirst
   */
  export type PasswordResetTokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokensOrderByWithRelationInput | PasswordResetTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokensScalarFieldEnum | PasswordResetTokensScalarFieldEnum[]
  }

  /**
   * PasswordResetTokens findFirstOrThrow
   */
  export type PasswordResetTokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokensOrderByWithRelationInput | PasswordResetTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokensScalarFieldEnum | PasswordResetTokensScalarFieldEnum[]
  }

  /**
   * PasswordResetTokens findMany
   */
  export type PasswordResetTokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokensOrderByWithRelationInput | PasswordResetTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokensScalarFieldEnum | PasswordResetTokensScalarFieldEnum[]
  }

  /**
   * PasswordResetTokens create
   */
  export type PasswordResetTokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetTokens.
     */
    data: XOR<PasswordResetTokensCreateInput, PasswordResetTokensUncheckedCreateInput>
  }

  /**
   * PasswordResetTokens createMany
   */
  export type PasswordResetTokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokensCreateManyInput | PasswordResetTokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetTokens createManyAndReturn
   */
  export type PasswordResetTokensCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokensCreateManyInput | PasswordResetTokensCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetTokens update
   */
  export type PasswordResetTokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetTokens.
     */
    data: XOR<PasswordResetTokensUpdateInput, PasswordResetTokensUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetTokens to update.
     */
    where: PasswordResetTokensWhereUniqueInput
  }

  /**
   * PasswordResetTokens updateMany
   */
  export type PasswordResetTokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokensUpdateManyMutationInput, PasswordResetTokensUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokensWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetTokens updateManyAndReturn
   */
  export type PasswordResetTokensUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokensUpdateManyMutationInput, PasswordResetTokensUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokensWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetTokens upsert
   */
  export type PasswordResetTokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetTokens to update in case it exists.
     */
    where: PasswordResetTokensWhereUniqueInput
    /**
     * In case the PasswordResetTokens found by the `where` argument doesn't exist, create a new PasswordResetTokens with this data.
     */
    create: XOR<PasswordResetTokensCreateInput, PasswordResetTokensUncheckedCreateInput>
    /**
     * In case the PasswordResetTokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokensUpdateInput, PasswordResetTokensUncheckedUpdateInput>
  }

  /**
   * PasswordResetTokens delete
   */
  export type PasswordResetTokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetTokens to delete.
     */
    where: PasswordResetTokensWhereUniqueInput
  }

  /**
   * PasswordResetTokens deleteMany
   */
  export type PasswordResetTokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokensWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetTokens without action
   */
  export type PasswordResetTokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetTokens
     */
    select?: PasswordResetTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetTokens
     */
    omit?: PasswordResetTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokensInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    is_verified: 'is_verified',
    first_name: 'first_name',
    last_name: 'last_name',
    created_on: 'created_on',
    updated_on: 'updated_on'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmailVerificationTokensScalarFieldEnum: {
    ev_token_id: 'ev_token_id',
    user_id: 'user_id',
    token: 'token',
    expires_on: 'expires_on',
    consumed_on: 'consumed_on',
    created_on: 'created_on'
  };

  export type EmailVerificationTokensScalarFieldEnum = (typeof EmailVerificationTokensScalarFieldEnum)[keyof typeof EmailVerificationTokensScalarFieldEnum]


  export const PasswordResetTokensScalarFieldEnum: {
    pr_token_id: 'pr_token_id',
    user_id: 'user_id',
    code: 'code',
    expires_on: 'expires_on',
    consumed_on: 'consumed_on',
    created_on: 'created_on'
  };

  export type PasswordResetTokensScalarFieldEnum = (typeof PasswordResetTokensScalarFieldEnum)[keyof typeof PasswordResetTokensScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    is_verified?: BoolFilter<"User"> | boolean
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    created_on?: DateTimeFilter<"User"> | Date | string
    updated_on?: DateTimeFilter<"User"> | Date | string
    EmailVerificationTokens?: EmailVerificationTokensListRelationFilter
    PasswordResetTokens?: PasswordResetTokensListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    is_verified?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    EmailVerificationTokens?: EmailVerificationTokensOrderByRelationAggregateInput
    PasswordResetTokens?: PasswordResetTokensOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    is_verified?: BoolFilter<"User"> | boolean
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    created_on?: DateTimeFilter<"User"> | Date | string
    updated_on?: DateTimeFilter<"User"> | Date | string
    EmailVerificationTokens?: EmailVerificationTokensListRelationFilter
    PasswordResetTokens?: PasswordResetTokensListRelationFilter
  }, "user_id" | "email">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    is_verified?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    is_verified?: BoolWithAggregatesFilter<"User"> | boolean
    first_name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    created_on?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_on?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EmailVerificationTokensWhereInput = {
    AND?: EmailVerificationTokensWhereInput | EmailVerificationTokensWhereInput[]
    OR?: EmailVerificationTokensWhereInput[]
    NOT?: EmailVerificationTokensWhereInput | EmailVerificationTokensWhereInput[]
    ev_token_id?: IntFilter<"EmailVerificationTokens"> | number
    user_id?: IntFilter<"EmailVerificationTokens"> | number
    token?: StringFilter<"EmailVerificationTokens"> | string
    expires_on?: DateTimeFilter<"EmailVerificationTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"EmailVerificationTokens"> | Date | string | null
    created_on?: DateTimeFilter<"EmailVerificationTokens"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailVerificationTokensOrderByWithRelationInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrderInput | SortOrder
    created_on?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type EmailVerificationTokensWhereUniqueInput = Prisma.AtLeast<{
    ev_token_id?: number
    token?: string
    AND?: EmailVerificationTokensWhereInput | EmailVerificationTokensWhereInput[]
    OR?: EmailVerificationTokensWhereInput[]
    NOT?: EmailVerificationTokensWhereInput | EmailVerificationTokensWhereInput[]
    user_id?: IntFilter<"EmailVerificationTokens"> | number
    expires_on?: DateTimeFilter<"EmailVerificationTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"EmailVerificationTokens"> | Date | string | null
    created_on?: DateTimeFilter<"EmailVerificationTokens"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "ev_token_id" | "token">

  export type EmailVerificationTokensOrderByWithAggregationInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrderInput | SortOrder
    created_on?: SortOrder
    _count?: EmailVerificationTokensCountOrderByAggregateInput
    _avg?: EmailVerificationTokensAvgOrderByAggregateInput
    _max?: EmailVerificationTokensMaxOrderByAggregateInput
    _min?: EmailVerificationTokensMinOrderByAggregateInput
    _sum?: EmailVerificationTokensSumOrderByAggregateInput
  }

  export type EmailVerificationTokensScalarWhereWithAggregatesInput = {
    AND?: EmailVerificationTokensScalarWhereWithAggregatesInput | EmailVerificationTokensScalarWhereWithAggregatesInput[]
    OR?: EmailVerificationTokensScalarWhereWithAggregatesInput[]
    NOT?: EmailVerificationTokensScalarWhereWithAggregatesInput | EmailVerificationTokensScalarWhereWithAggregatesInput[]
    ev_token_id?: IntWithAggregatesFilter<"EmailVerificationTokens"> | number
    user_id?: IntWithAggregatesFilter<"EmailVerificationTokens"> | number
    token?: StringWithAggregatesFilter<"EmailVerificationTokens"> | string
    expires_on?: DateTimeWithAggregatesFilter<"EmailVerificationTokens"> | Date | string
    consumed_on?: DateTimeNullableWithAggregatesFilter<"EmailVerificationTokens"> | Date | string | null
    created_on?: DateTimeWithAggregatesFilter<"EmailVerificationTokens"> | Date | string
  }

  export type PasswordResetTokensWhereInput = {
    AND?: PasswordResetTokensWhereInput | PasswordResetTokensWhereInput[]
    OR?: PasswordResetTokensWhereInput[]
    NOT?: PasswordResetTokensWhereInput | PasswordResetTokensWhereInput[]
    pr_token_id?: IntFilter<"PasswordResetTokens"> | number
    user_id?: IntFilter<"PasswordResetTokens"> | number
    code?: StringFilter<"PasswordResetTokens"> | string
    expires_on?: DateTimeFilter<"PasswordResetTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"PasswordResetTokens"> | Date | string | null
    created_on?: DateTimeFilter<"PasswordResetTokens"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokensOrderByWithRelationInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
    code?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrderInput | SortOrder
    created_on?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokensWhereUniqueInput = Prisma.AtLeast<{
    pr_token_id?: number
    AND?: PasswordResetTokensWhereInput | PasswordResetTokensWhereInput[]
    OR?: PasswordResetTokensWhereInput[]
    NOT?: PasswordResetTokensWhereInput | PasswordResetTokensWhereInput[]
    user_id?: IntFilter<"PasswordResetTokens"> | number
    code?: StringFilter<"PasswordResetTokens"> | string
    expires_on?: DateTimeFilter<"PasswordResetTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"PasswordResetTokens"> | Date | string | null
    created_on?: DateTimeFilter<"PasswordResetTokens"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "pr_token_id">

  export type PasswordResetTokensOrderByWithAggregationInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
    code?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrderInput | SortOrder
    created_on?: SortOrder
    _count?: PasswordResetTokensCountOrderByAggregateInput
    _avg?: PasswordResetTokensAvgOrderByAggregateInput
    _max?: PasswordResetTokensMaxOrderByAggregateInput
    _min?: PasswordResetTokensMinOrderByAggregateInput
    _sum?: PasswordResetTokensSumOrderByAggregateInput
  }

  export type PasswordResetTokensScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokensScalarWhereWithAggregatesInput | PasswordResetTokensScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokensScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokensScalarWhereWithAggregatesInput | PasswordResetTokensScalarWhereWithAggregatesInput[]
    pr_token_id?: IntWithAggregatesFilter<"PasswordResetTokens"> | number
    user_id?: IntWithAggregatesFilter<"PasswordResetTokens"> | number
    code?: StringWithAggregatesFilter<"PasswordResetTokens"> | string
    expires_on?: DateTimeWithAggregatesFilter<"PasswordResetTokens"> | Date | string
    consumed_on?: DateTimeNullableWithAggregatesFilter<"PasswordResetTokens"> | Date | string | null
    created_on?: DateTimeWithAggregatesFilter<"PasswordResetTokens"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokensCreateInput = {
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    User: UserCreateNestedOneWithoutEmailVerificationTokensInput
  }

  export type EmailVerificationTokensUncheckedCreateInput = {
    ev_token_id?: number
    user_id: number
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type EmailVerificationTokensUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutEmailVerificationTokensNestedInput
  }

  export type EmailVerificationTokensUncheckedUpdateInput = {
    ev_token_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokensCreateManyInput = {
    ev_token_id?: number
    user_id: number
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type EmailVerificationTokensUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokensUncheckedUpdateManyInput = {
    ev_token_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokensCreateInput = {
    code: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    User: UserCreateNestedOneWithoutPasswordResetTokensInput
  }

  export type PasswordResetTokensUncheckedCreateInput = {
    pr_token_id?: number
    user_id: number
    code: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type PasswordResetTokensUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput
  }

  export type PasswordResetTokensUncheckedUpdateInput = {
    pr_token_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokensCreateManyInput = {
    pr_token_id?: number
    user_id: number
    code: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type PasswordResetTokensUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokensUncheckedUpdateManyInput = {
    pr_token_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmailVerificationTokensListRelationFilter = {
    every?: EmailVerificationTokensWhereInput
    some?: EmailVerificationTokensWhereInput
    none?: EmailVerificationTokensWhereInput
  }

  export type PasswordResetTokensListRelationFilter = {
    every?: PasswordResetTokensWhereInput
    some?: PasswordResetTokensWhereInput
    none?: PasswordResetTokensWhereInput
  }

  export type EmailVerificationTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    is_verified?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    is_verified?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    is_verified?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmailVerificationTokensCountOrderByAggregateInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
  }

  export type EmailVerificationTokensAvgOrderByAggregateInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
  }

  export type EmailVerificationTokensMaxOrderByAggregateInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
  }

  export type EmailVerificationTokensMinOrderByAggregateInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
  }

  export type EmailVerificationTokensSumOrderByAggregateInput = {
    ev_token_id?: SortOrder
    user_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PasswordResetTokensCountOrderByAggregateInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
    code?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
  }

  export type PasswordResetTokensAvgOrderByAggregateInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
  }

  export type PasswordResetTokensMaxOrderByAggregateInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
    code?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
  }

  export type PasswordResetTokensMinOrderByAggregateInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
    code?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
  }

  export type PasswordResetTokensSumOrderByAggregateInput = {
    pr_token_id?: SortOrder
    user_id?: SortOrder
  }

  export type EmailVerificationTokensCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailVerificationTokensCreateWithoutUserInput, EmailVerificationTokensUncheckedCreateWithoutUserInput> | EmailVerificationTokensCreateWithoutUserInput[] | EmailVerificationTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokensCreateOrConnectWithoutUserInput | EmailVerificationTokensCreateOrConnectWithoutUserInput[]
    createMany?: EmailVerificationTokensCreateManyUserInputEnvelope
    connect?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
  }

  export type PasswordResetTokensCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokensCreateWithoutUserInput, PasswordResetTokensUncheckedCreateWithoutUserInput> | PasswordResetTokensCreateWithoutUserInput[] | PasswordResetTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokensCreateOrConnectWithoutUserInput | PasswordResetTokensCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokensCreateManyUserInputEnvelope
    connect?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
  }

  export type EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailVerificationTokensCreateWithoutUserInput, EmailVerificationTokensUncheckedCreateWithoutUserInput> | EmailVerificationTokensCreateWithoutUserInput[] | EmailVerificationTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokensCreateOrConnectWithoutUserInput | EmailVerificationTokensCreateOrConnectWithoutUserInput[]
    createMany?: EmailVerificationTokensCreateManyUserInputEnvelope
    connect?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
  }

  export type PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokensCreateWithoutUserInput, PasswordResetTokensUncheckedCreateWithoutUserInput> | PasswordResetTokensCreateWithoutUserInput[] | PasswordResetTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokensCreateOrConnectWithoutUserInput | PasswordResetTokensCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokensCreateManyUserInputEnvelope
    connect?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmailVerificationTokensUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailVerificationTokensCreateWithoutUserInput, EmailVerificationTokensUncheckedCreateWithoutUserInput> | EmailVerificationTokensCreateWithoutUserInput[] | EmailVerificationTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokensCreateOrConnectWithoutUserInput | EmailVerificationTokensCreateOrConnectWithoutUserInput[]
    upsert?: EmailVerificationTokensUpsertWithWhereUniqueWithoutUserInput | EmailVerificationTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailVerificationTokensCreateManyUserInputEnvelope
    set?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    disconnect?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    delete?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    connect?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    update?: EmailVerificationTokensUpdateWithWhereUniqueWithoutUserInput | EmailVerificationTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailVerificationTokensUpdateManyWithWhereWithoutUserInput | EmailVerificationTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailVerificationTokensScalarWhereInput | EmailVerificationTokensScalarWhereInput[]
  }

  export type PasswordResetTokensUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokensCreateWithoutUserInput, PasswordResetTokensUncheckedCreateWithoutUserInput> | PasswordResetTokensCreateWithoutUserInput[] | PasswordResetTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokensCreateOrConnectWithoutUserInput | PasswordResetTokensCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokensUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokensCreateManyUserInputEnvelope
    set?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    disconnect?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    delete?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    connect?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    update?: PasswordResetTokensUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokensUpdateManyWithWhereWithoutUserInput | PasswordResetTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokensScalarWhereInput | PasswordResetTokensScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailVerificationTokensCreateWithoutUserInput, EmailVerificationTokensUncheckedCreateWithoutUserInput> | EmailVerificationTokensCreateWithoutUserInput[] | EmailVerificationTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailVerificationTokensCreateOrConnectWithoutUserInput | EmailVerificationTokensCreateOrConnectWithoutUserInput[]
    upsert?: EmailVerificationTokensUpsertWithWhereUniqueWithoutUserInput | EmailVerificationTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailVerificationTokensCreateManyUserInputEnvelope
    set?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    disconnect?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    delete?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    connect?: EmailVerificationTokensWhereUniqueInput | EmailVerificationTokensWhereUniqueInput[]
    update?: EmailVerificationTokensUpdateWithWhereUniqueWithoutUserInput | EmailVerificationTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailVerificationTokensUpdateManyWithWhereWithoutUserInput | EmailVerificationTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailVerificationTokensScalarWhereInput | EmailVerificationTokensScalarWhereInput[]
  }

  export type PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokensCreateWithoutUserInput, PasswordResetTokensUncheckedCreateWithoutUserInput> | PasswordResetTokensCreateWithoutUserInput[] | PasswordResetTokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokensCreateOrConnectWithoutUserInput | PasswordResetTokensCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokensUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokensCreateManyUserInputEnvelope
    set?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    disconnect?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    delete?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    connect?: PasswordResetTokensWhereUniqueInput | PasswordResetTokensWhereUniqueInput[]
    update?: PasswordResetTokensUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokensUpdateManyWithWhereWithoutUserInput | PasswordResetTokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokensScalarWhereInput | PasswordResetTokensScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmailVerificationTokensInput = {
    create?: XOR<UserCreateWithoutEmailVerificationTokensInput, UserUncheckedCreateWithoutEmailVerificationTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailVerificationTokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutEmailVerificationTokensNestedInput = {
    create?: XOR<UserCreateWithoutEmailVerificationTokensInput, UserUncheckedCreateWithoutEmailVerificationTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailVerificationTokensInput
    upsert?: UserUpsertWithoutEmailVerificationTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailVerificationTokensInput, UserUpdateWithoutEmailVerificationTokensInput>, UserUncheckedUpdateWithoutEmailVerificationTokensInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    upsert?: UserUpsertWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, UserUpdateWithoutPasswordResetTokensInput>, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EmailVerificationTokensCreateWithoutUserInput = {
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type EmailVerificationTokensUncheckedCreateWithoutUserInput = {
    ev_token_id?: number
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type EmailVerificationTokensCreateOrConnectWithoutUserInput = {
    where: EmailVerificationTokensWhereUniqueInput
    create: XOR<EmailVerificationTokensCreateWithoutUserInput, EmailVerificationTokensUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationTokensCreateManyUserInputEnvelope = {
    data: EmailVerificationTokensCreateManyUserInput | EmailVerificationTokensCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokensCreateWithoutUserInput = {
    code: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type PasswordResetTokensUncheckedCreateWithoutUserInput = {
    pr_token_id?: number
    code: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type PasswordResetTokensCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokensWhereUniqueInput
    create: XOR<PasswordResetTokensCreateWithoutUserInput, PasswordResetTokensUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokensCreateManyUserInputEnvelope = {
    data: PasswordResetTokensCreateManyUserInput | PasswordResetTokensCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailVerificationTokensUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailVerificationTokensWhereUniqueInput
    update: XOR<EmailVerificationTokensUpdateWithoutUserInput, EmailVerificationTokensUncheckedUpdateWithoutUserInput>
    create: XOR<EmailVerificationTokensCreateWithoutUserInput, EmailVerificationTokensUncheckedCreateWithoutUserInput>
  }

  export type EmailVerificationTokensUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailVerificationTokensWhereUniqueInput
    data: XOR<EmailVerificationTokensUpdateWithoutUserInput, EmailVerificationTokensUncheckedUpdateWithoutUserInput>
  }

  export type EmailVerificationTokensUpdateManyWithWhereWithoutUserInput = {
    where: EmailVerificationTokensScalarWhereInput
    data: XOR<EmailVerificationTokensUpdateManyMutationInput, EmailVerificationTokensUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailVerificationTokensScalarWhereInput = {
    AND?: EmailVerificationTokensScalarWhereInput | EmailVerificationTokensScalarWhereInput[]
    OR?: EmailVerificationTokensScalarWhereInput[]
    NOT?: EmailVerificationTokensScalarWhereInput | EmailVerificationTokensScalarWhereInput[]
    ev_token_id?: IntFilter<"EmailVerificationTokens"> | number
    user_id?: IntFilter<"EmailVerificationTokens"> | number
    token?: StringFilter<"EmailVerificationTokens"> | string
    expires_on?: DateTimeFilter<"EmailVerificationTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"EmailVerificationTokens"> | Date | string | null
    created_on?: DateTimeFilter<"EmailVerificationTokens"> | Date | string
  }

  export type PasswordResetTokensUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokensWhereUniqueInput
    update: XOR<PasswordResetTokensUpdateWithoutUserInput, PasswordResetTokensUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokensCreateWithoutUserInput, PasswordResetTokensUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokensUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokensWhereUniqueInput
    data: XOR<PasswordResetTokensUpdateWithoutUserInput, PasswordResetTokensUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokensUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetTokensScalarWhereInput
    data: XOR<PasswordResetTokensUpdateManyMutationInput, PasswordResetTokensUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokensScalarWhereInput = {
    AND?: PasswordResetTokensScalarWhereInput | PasswordResetTokensScalarWhereInput[]
    OR?: PasswordResetTokensScalarWhereInput[]
    NOT?: PasswordResetTokensScalarWhereInput | PasswordResetTokensScalarWhereInput[]
    pr_token_id?: IntFilter<"PasswordResetTokens"> | number
    user_id?: IntFilter<"PasswordResetTokens"> | number
    code?: StringFilter<"PasswordResetTokens"> | string
    expires_on?: DateTimeFilter<"PasswordResetTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"PasswordResetTokens"> | Date | string | null
    created_on?: DateTimeFilter<"PasswordResetTokens"> | Date | string
  }

  export type UserCreateWithoutEmailVerificationTokensInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailVerificationTokensInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailVerificationTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailVerificationTokensInput, UserUncheckedCreateWithoutEmailVerificationTokensInput>
  }

  export type UserUpsertWithoutEmailVerificationTokensInput = {
    update: XOR<UserUpdateWithoutEmailVerificationTokensInput, UserUncheckedUpdateWithoutEmailVerificationTokensInput>
    create: XOR<UserCreateWithoutEmailVerificationTokensInput, UserUncheckedCreateWithoutEmailVerificationTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailVerificationTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailVerificationTokensInput, UserUncheckedUpdateWithoutEmailVerificationTokensInput>
  }

  export type UserUpdateWithoutEmailVerificationTokensInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailVerificationTokensInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPasswordResetTokensInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
  }

  export type UserUpsertWithoutPasswordResetTokensInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type UserUpdateWithoutPasswordResetTokensInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EmailVerificationTokensCreateManyUserInput = {
    ev_token_id?: number
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type PasswordResetTokensCreateManyUserInput = {
    pr_token_id?: number
    code: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type EmailVerificationTokensUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokensUncheckedUpdateWithoutUserInput = {
    ev_token_id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationTokensUncheckedUpdateManyWithoutUserInput = {
    ev_token_id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokensUpdateWithoutUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokensUncheckedUpdateWithoutUserInput = {
    pr_token_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokensUncheckedUpdateManyWithoutUserInput = {
    pr_token_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}