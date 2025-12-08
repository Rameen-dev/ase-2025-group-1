
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
 * Model Charities
 * 
 */
export type Charities = $Result.DefaultSelection<Prisma.$CharitiesPayload>
/**
 * Model CharityApplications
 * 
 */
export type CharityApplications = $Result.DefaultSelection<Prisma.$CharityApplicationsPayload>
/**
 * Model CharitySignupTokens
 * 
 */
export type CharitySignupTokens = $Result.DefaultSelection<Prisma.$CharitySignupTokensPayload>
/**
 * Model Donations
 * 
 */
export type Donations = $Result.DefaultSelection<Prisma.$DonationsPayload>
/**
 * Model DonationRequest
 * 
 */
export type DonationRequest = $Result.DefaultSelection<Prisma.$DonationRequestPayload>
/**
 * Model ClothingItems
 * 
 */
export type ClothingItems = $Result.DefaultSelection<Prisma.$ClothingItemsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

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

  /**
   * `prisma.charities`: Exposes CRUD operations for the **Charities** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Charities
    * const charities = await prisma.charities.findMany()
    * ```
    */
  get charities(): Prisma.CharitiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.charityApplications`: Exposes CRUD operations for the **CharityApplications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharityApplications
    * const charityApplications = await prisma.charityApplications.findMany()
    * ```
    */
  get charityApplications(): Prisma.CharityApplicationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.charitySignupTokens`: Exposes CRUD operations for the **CharitySignupTokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharitySignupTokens
    * const charitySignupTokens = await prisma.charitySignupTokens.findMany()
    * ```
    */
  get charitySignupTokens(): Prisma.CharitySignupTokensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.donations`: Exposes CRUD operations for the **Donations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Donations
    * const donations = await prisma.donations.findMany()
    * ```
    */
  get donations(): Prisma.DonationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.donationRequest`: Exposes CRUD operations for the **DonationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DonationRequests
    * const donationRequests = await prisma.donationRequest.findMany()
    * ```
    */
  get donationRequest(): Prisma.DonationRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clothingItems`: Exposes CRUD operations for the **ClothingItems** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClothingItems
    * const clothingItems = await prisma.clothingItems.findMany()
    * ```
    */
  get clothingItems(): Prisma.ClothingItemsDelegate<ExtArgs, ClientOptions>;
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
    PasswordResetTokens: 'PasswordResetTokens',
    Charities: 'Charities',
    CharityApplications: 'CharityApplications',
    CharitySignupTokens: 'CharitySignupTokens',
    Donations: 'Donations',
    DonationRequest: 'DonationRequest',
    ClothingItems: 'ClothingItems'
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
      modelProps: "user" | "emailVerificationTokens" | "passwordResetTokens" | "charities" | "charityApplications" | "charitySignupTokens" | "donations" | "donationRequest" | "clothingItems"
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
      Charities: {
        payload: Prisma.$CharitiesPayload<ExtArgs>
        fields: Prisma.CharitiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharitiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharitiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>
          }
          findFirst: {
            args: Prisma.CharitiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharitiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>
          }
          findMany: {
            args: Prisma.CharitiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>[]
          }
          create: {
            args: Prisma.CharitiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>
          }
          createMany: {
            args: Prisma.CharitiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharitiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>[]
          }
          delete: {
            args: Prisma.CharitiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>
          }
          update: {
            args: Prisma.CharitiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>
          }
          deleteMany: {
            args: Prisma.CharitiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharitiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharitiesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>[]
          }
          upsert: {
            args: Prisma.CharitiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitiesPayload>
          }
          aggregate: {
            args: Prisma.CharitiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharities>
          }
          groupBy: {
            args: Prisma.CharitiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharitiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharitiesCountArgs<ExtArgs>
            result: $Utils.Optional<CharitiesCountAggregateOutputType> | number
          }
        }
      }
      CharityApplications: {
        payload: Prisma.$CharityApplicationsPayload<ExtArgs>
        fields: Prisma.CharityApplicationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharityApplicationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharityApplicationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>
          }
          findFirst: {
            args: Prisma.CharityApplicationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharityApplicationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>
          }
          findMany: {
            args: Prisma.CharityApplicationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>[]
          }
          create: {
            args: Prisma.CharityApplicationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>
          }
          createMany: {
            args: Prisma.CharityApplicationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharityApplicationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>[]
          }
          delete: {
            args: Prisma.CharityApplicationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>
          }
          update: {
            args: Prisma.CharityApplicationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>
          }
          deleteMany: {
            args: Prisma.CharityApplicationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharityApplicationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharityApplicationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>[]
          }
          upsert: {
            args: Prisma.CharityApplicationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityApplicationsPayload>
          }
          aggregate: {
            args: Prisma.CharityApplicationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharityApplications>
          }
          groupBy: {
            args: Prisma.CharityApplicationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharityApplicationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharityApplicationsCountArgs<ExtArgs>
            result: $Utils.Optional<CharityApplicationsCountAggregateOutputType> | number
          }
        }
      }
      CharitySignupTokens: {
        payload: Prisma.$CharitySignupTokensPayload<ExtArgs>
        fields: Prisma.CharitySignupTokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharitySignupTokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharitySignupTokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>
          }
          findFirst: {
            args: Prisma.CharitySignupTokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharitySignupTokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>
          }
          findMany: {
            args: Prisma.CharitySignupTokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>[]
          }
          create: {
            args: Prisma.CharitySignupTokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>
          }
          createMany: {
            args: Prisma.CharitySignupTokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharitySignupTokensCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>[]
          }
          delete: {
            args: Prisma.CharitySignupTokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>
          }
          update: {
            args: Prisma.CharitySignupTokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>
          }
          deleteMany: {
            args: Prisma.CharitySignupTokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharitySignupTokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharitySignupTokensUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>[]
          }
          upsert: {
            args: Prisma.CharitySignupTokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharitySignupTokensPayload>
          }
          aggregate: {
            args: Prisma.CharitySignupTokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharitySignupTokens>
          }
          groupBy: {
            args: Prisma.CharitySignupTokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharitySignupTokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharitySignupTokensCountArgs<ExtArgs>
            result: $Utils.Optional<CharitySignupTokensCountAggregateOutputType> | number
          }
        }
      }
      Donations: {
        payload: Prisma.$DonationsPayload<ExtArgs>
        fields: Prisma.DonationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>
          }
          findFirst: {
            args: Prisma.DonationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>
          }
          findMany: {
            args: Prisma.DonationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>[]
          }
          create: {
            args: Prisma.DonationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>
          }
          createMany: {
            args: Prisma.DonationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>[]
          }
          delete: {
            args: Prisma.DonationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>
          }
          update: {
            args: Prisma.DonationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>
          }
          deleteMany: {
            args: Prisma.DonationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DonationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>[]
          }
          upsert: {
            args: Prisma.DonationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationsPayload>
          }
          aggregate: {
            args: Prisma.DonationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonations>
          }
          groupBy: {
            args: Prisma.DonationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonationsCountArgs<ExtArgs>
            result: $Utils.Optional<DonationsCountAggregateOutputType> | number
          }
        }
      }
      DonationRequest: {
        payload: Prisma.$DonationRequestPayload<ExtArgs>
        fields: Prisma.DonationRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonationRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonationRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>
          }
          findFirst: {
            args: Prisma.DonationRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonationRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>
          }
          findMany: {
            args: Prisma.DonationRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>[]
          }
          create: {
            args: Prisma.DonationRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>
          }
          createMany: {
            args: Prisma.DonationRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonationRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>[]
          }
          delete: {
            args: Prisma.DonationRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>
          }
          update: {
            args: Prisma.DonationRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>
          }
          deleteMany: {
            args: Prisma.DonationRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonationRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DonationRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>[]
          }
          upsert: {
            args: Prisma.DonationRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationRequestPayload>
          }
          aggregate: {
            args: Prisma.DonationRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonationRequest>
          }
          groupBy: {
            args: Prisma.DonationRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonationRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonationRequestCountArgs<ExtArgs>
            result: $Utils.Optional<DonationRequestCountAggregateOutputType> | number
          }
        }
      }
      ClothingItems: {
        payload: Prisma.$ClothingItemsPayload<ExtArgs>
        fields: Prisma.ClothingItemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClothingItemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClothingItemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>
          }
          findFirst: {
            args: Prisma.ClothingItemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClothingItemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>
          }
          findMany: {
            args: Prisma.ClothingItemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>[]
          }
          create: {
            args: Prisma.ClothingItemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>
          }
          createMany: {
            args: Prisma.ClothingItemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClothingItemsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>[]
          }
          delete: {
            args: Prisma.ClothingItemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>
          }
          update: {
            args: Prisma.ClothingItemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>
          }
          deleteMany: {
            args: Prisma.ClothingItemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClothingItemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClothingItemsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>[]
          }
          upsert: {
            args: Prisma.ClothingItemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClothingItemsPayload>
          }
          aggregate: {
            args: Prisma.ClothingItemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClothingItems>
          }
          groupBy: {
            args: Prisma.ClothingItemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClothingItemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClothingItemsCountArgs<ExtArgs>
            result: $Utils.Optional<ClothingItemsCountAggregateOutputType> | number
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
    charities?: CharitiesOmit
    charityApplications?: CharityApplicationsOmit
    charitySignupTokens?: CharitySignupTokensOmit
    donations?: DonationsOmit
    donationRequest?: DonationRequestOmit
    clothingItems?: ClothingItemsOmit
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
    approved_applications: number
    reviewed_applications: number
    created_invites: number
    EmailVerificationTokens: number
    PasswordResetTokens: number
    donation_requests: number
    donations_created: number
    ClothingItems: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approved_applications?: boolean | UserCountOutputTypeCountApproved_applicationsArgs
    reviewed_applications?: boolean | UserCountOutputTypeCountReviewed_applicationsArgs
    created_invites?: boolean | UserCountOutputTypeCountCreated_invitesArgs
    EmailVerificationTokens?: boolean | UserCountOutputTypeCountEmailVerificationTokensArgs
    PasswordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs
    donation_requests?: boolean | UserCountOutputTypeCountDonation_requestsArgs
    donations_created?: boolean | UserCountOutputTypeCountDonations_createdArgs
    ClothingItems?: boolean | UserCountOutputTypeCountClothingItemsArgs
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
  export type UserCountOutputTypeCountApproved_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharityApplicationsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewed_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharityApplicationsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreated_invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharitySignupTokensWhereInput
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDonation_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDonations_createdArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClothingItemsWhereInput
  }


  /**
   * Count Type CharitiesCountOutputType
   */

  export type CharitiesCountOutputType = {
    applications: number
    signup_tokens: number
    donation_requests_answered: number
    donations_received: number
    ClothingItems: number
  }

  export type CharitiesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | CharitiesCountOutputTypeCountApplicationsArgs
    signup_tokens?: boolean | CharitiesCountOutputTypeCountSignup_tokensArgs
    donation_requests_answered?: boolean | CharitiesCountOutputTypeCountDonation_requests_answeredArgs
    donations_received?: boolean | CharitiesCountOutputTypeCountDonations_receivedArgs
    ClothingItems?: boolean | CharitiesCountOutputTypeCountClothingItemsArgs
  }

  // Custom InputTypes
  /**
   * CharitiesCountOutputType without action
   */
  export type CharitiesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitiesCountOutputType
     */
    select?: CharitiesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CharitiesCountOutputType without action
   */
  export type CharitiesCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharityApplicationsWhereInput
  }

  /**
   * CharitiesCountOutputType without action
   */
  export type CharitiesCountOutputTypeCountSignup_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharitySignupTokensWhereInput
  }

  /**
   * CharitiesCountOutputType without action
   */
  export type CharitiesCountOutputTypeCountDonation_requests_answeredArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationRequestWhereInput
  }

  /**
   * CharitiesCountOutputType without action
   */
  export type CharitiesCountOutputTypeCountDonations_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationsWhereInput
  }

  /**
   * CharitiesCountOutputType without action
   */
  export type CharitiesCountOutputTypeCountClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClothingItemsWhereInput
  }


  /**
   * Count Type DonationsCountOutputType
   */

  export type DonationsCountOutputType = {
    ClothingItems: number
  }

  export type DonationsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ClothingItems?: boolean | DonationsCountOutputTypeCountClothingItemsArgs
  }

  // Custom InputTypes
  /**
   * DonationsCountOutputType without action
   */
  export type DonationsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationsCountOutputType
     */
    select?: DonationsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DonationsCountOutputType without action
   */
  export type DonationsCountOutputTypeCountClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClothingItemsWhereInput
  }


  /**
   * Count Type DonationRequestCountOutputType
   */

  export type DonationRequestCountOutputType = {
    ClothingItems: number
  }

  export type DonationRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ClothingItems?: boolean | DonationRequestCountOutputTypeCountClothingItemsArgs
  }

  // Custom InputTypes
  /**
   * DonationRequestCountOutputType without action
   */
  export type DonationRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequestCountOutputType
     */
    select?: DonationRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DonationRequestCountOutputType without action
   */
  export type DonationRequestCountOutputTypeCountClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClothingItemsWhereInput
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
    approved_applications?: boolean | User$approved_applicationsArgs<ExtArgs>
    reviewed_applications?: boolean | User$reviewed_applicationsArgs<ExtArgs>
    created_invites?: boolean | User$created_invitesArgs<ExtArgs>
    EmailVerificationTokens?: boolean | User$EmailVerificationTokensArgs<ExtArgs>
    PasswordResetTokens?: boolean | User$PasswordResetTokensArgs<ExtArgs>
    donation_requests?: boolean | User$donation_requestsArgs<ExtArgs>
    donations_created?: boolean | User$donations_createdArgs<ExtArgs>
    ClothingItems?: boolean | User$ClothingItemsArgs<ExtArgs>
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
    approved_applications?: boolean | User$approved_applicationsArgs<ExtArgs>
    reviewed_applications?: boolean | User$reviewed_applicationsArgs<ExtArgs>
    created_invites?: boolean | User$created_invitesArgs<ExtArgs>
    EmailVerificationTokens?: boolean | User$EmailVerificationTokensArgs<ExtArgs>
    PasswordResetTokens?: boolean | User$PasswordResetTokensArgs<ExtArgs>
    donation_requests?: boolean | User$donation_requestsArgs<ExtArgs>
    donations_created?: boolean | User$donations_createdArgs<ExtArgs>
    ClothingItems?: boolean | User$ClothingItemsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      approved_applications: Prisma.$CharityApplicationsPayload<ExtArgs>[]
      reviewed_applications: Prisma.$CharityApplicationsPayload<ExtArgs>[]
      created_invites: Prisma.$CharitySignupTokensPayload<ExtArgs>[]
      EmailVerificationTokens: Prisma.$EmailVerificationTokensPayload<ExtArgs>[]
      PasswordResetTokens: Prisma.$PasswordResetTokensPayload<ExtArgs>[]
      donation_requests: Prisma.$DonationRequestPayload<ExtArgs>[]
      donations_created: Prisma.$DonationsPayload<ExtArgs>[]
      ClothingItems: Prisma.$ClothingItemsPayload<ExtArgs>[]
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
    approved_applications<T extends User$approved_applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$approved_applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewed_applications<T extends User$reviewed_applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewed_applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    created_invites<T extends User$created_invitesArgs<ExtArgs> = {}>(args?: Subset<T, User$created_invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    EmailVerificationTokens<T extends User$EmailVerificationTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$EmailVerificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PasswordResetTokens<T extends User$PasswordResetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$PasswordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    donation_requests<T extends User$donation_requestsArgs<ExtArgs> = {}>(args?: Subset<T, User$donation_requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    donations_created<T extends User$donations_createdArgs<ExtArgs> = {}>(args?: Subset<T, User$donations_createdArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ClothingItems<T extends User$ClothingItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$ClothingItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.approved_applications
   */
  export type User$approved_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    where?: CharityApplicationsWhereInput
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    cursor?: CharityApplicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharityApplicationsScalarFieldEnum | CharityApplicationsScalarFieldEnum[]
  }

  /**
   * User.reviewed_applications
   */
  export type User$reviewed_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    where?: CharityApplicationsWhereInput
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    cursor?: CharityApplicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharityApplicationsScalarFieldEnum | CharityApplicationsScalarFieldEnum[]
  }

  /**
   * User.created_invites
   */
  export type User$created_invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    where?: CharitySignupTokensWhereInput
    orderBy?: CharitySignupTokensOrderByWithRelationInput | CharitySignupTokensOrderByWithRelationInput[]
    cursor?: CharitySignupTokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharitySignupTokensScalarFieldEnum | CharitySignupTokensScalarFieldEnum[]
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
   * User.donation_requests
   */
  export type User$donation_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    where?: DonationRequestWhereInput
    orderBy?: DonationRequestOrderByWithRelationInput | DonationRequestOrderByWithRelationInput[]
    cursor?: DonationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationRequestScalarFieldEnum | DonationRequestScalarFieldEnum[]
  }

  /**
   * User.donations_created
   */
  export type User$donations_createdArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    where?: DonationsWhereInput
    orderBy?: DonationsOrderByWithRelationInput | DonationsOrderByWithRelationInput[]
    cursor?: DonationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationsScalarFieldEnum | DonationsScalarFieldEnum[]
  }

  /**
   * User.ClothingItems
   */
  export type User$ClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    where?: ClothingItemsWhereInput
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    cursor?: ClothingItemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
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
   * Model Charities
   */

  export type AggregateCharities = {
    _count: CharitiesCountAggregateOutputType | null
    _avg: CharitiesAvgAggregateOutputType | null
    _sum: CharitiesSumAggregateOutputType | null
    _min: CharitiesMinAggregateOutputType | null
    _max: CharitiesMaxAggregateOutputType | null
  }

  export type CharitiesAvgAggregateOutputType = {
    charity_id: number | null
  }

  export type CharitiesSumAggregateOutputType = {
    charity_id: number | null
  }

  export type CharitiesMinAggregateOutputType = {
    charity_id: number | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    website: string | null
    verified: boolean | null
    created_on: Date | null
    updated_on: Date | null
    password_hash: string | null
  }

  export type CharitiesMaxAggregateOutputType = {
    charity_id: number | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    website: string | null
    verified: boolean | null
    created_on: Date | null
    updated_on: Date | null
    password_hash: string | null
  }

  export type CharitiesCountAggregateOutputType = {
    charity_id: number
    name: number
    email: number
    phone: number
    address: number
    website: number
    verified: number
    created_on: number
    updated_on: number
    password_hash: number
    _all: number
  }


  export type CharitiesAvgAggregateInputType = {
    charity_id?: true
  }

  export type CharitiesSumAggregateInputType = {
    charity_id?: true
  }

  export type CharitiesMinAggregateInputType = {
    charity_id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    website?: true
    verified?: true
    created_on?: true
    updated_on?: true
    password_hash?: true
  }

  export type CharitiesMaxAggregateInputType = {
    charity_id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    website?: true
    verified?: true
    created_on?: true
    updated_on?: true
    password_hash?: true
  }

  export type CharitiesCountAggregateInputType = {
    charity_id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    website?: true
    verified?: true
    created_on?: true
    updated_on?: true
    password_hash?: true
    _all?: true
  }

  export type CharitiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Charities to aggregate.
     */
    where?: CharitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharitiesOrderByWithRelationInput | CharitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Charities
    **/
    _count?: true | CharitiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharitiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharitiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharitiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharitiesMaxAggregateInputType
  }

  export type GetCharitiesAggregateType<T extends CharitiesAggregateArgs> = {
        [P in keyof T & keyof AggregateCharities]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharities[P]>
      : GetScalarType<T[P], AggregateCharities[P]>
  }




  export type CharitiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharitiesWhereInput
    orderBy?: CharitiesOrderByWithAggregationInput | CharitiesOrderByWithAggregationInput[]
    by: CharitiesScalarFieldEnum[] | CharitiesScalarFieldEnum
    having?: CharitiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharitiesCountAggregateInputType | true
    _avg?: CharitiesAvgAggregateInputType
    _sum?: CharitiesSumAggregateInputType
    _min?: CharitiesMinAggregateInputType
    _max?: CharitiesMaxAggregateInputType
  }

  export type CharitiesGroupByOutputType = {
    charity_id: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified: boolean
    created_on: Date
    updated_on: Date
    password_hash: string | null
    _count: CharitiesCountAggregateOutputType | null
    _avg: CharitiesAvgAggregateOutputType | null
    _sum: CharitiesSumAggregateOutputType | null
    _min: CharitiesMinAggregateOutputType | null
    _max: CharitiesMaxAggregateOutputType | null
  }

  type GetCharitiesGroupByPayload<T extends CharitiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharitiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharitiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharitiesGroupByOutputType[P]>
            : GetScalarType<T[P], CharitiesGroupByOutputType[P]>
        }
      >
    >


  export type CharitiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    charity_id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    verified?: boolean
    created_on?: boolean
    updated_on?: boolean
    password_hash?: boolean
    applications?: boolean | Charities$applicationsArgs<ExtArgs>
    signup_tokens?: boolean | Charities$signup_tokensArgs<ExtArgs>
    donation_requests_answered?: boolean | Charities$donation_requests_answeredArgs<ExtArgs>
    donations_received?: boolean | Charities$donations_receivedArgs<ExtArgs>
    ClothingItems?: boolean | Charities$ClothingItemsArgs<ExtArgs>
    _count?: boolean | CharitiesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["charities"]>

  export type CharitiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    charity_id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    verified?: boolean
    created_on?: boolean
    updated_on?: boolean
    password_hash?: boolean
  }, ExtArgs["result"]["charities"]>

  export type CharitiesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    charity_id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    verified?: boolean
    created_on?: boolean
    updated_on?: boolean
    password_hash?: boolean
  }, ExtArgs["result"]["charities"]>

  export type CharitiesSelectScalar = {
    charity_id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    verified?: boolean
    created_on?: boolean
    updated_on?: boolean
    password_hash?: boolean
  }

  export type CharitiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"charity_id" | "name" | "email" | "phone" | "address" | "website" | "verified" | "created_on" | "updated_on" | "password_hash", ExtArgs["result"]["charities"]>
  export type CharitiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Charities$applicationsArgs<ExtArgs>
    signup_tokens?: boolean | Charities$signup_tokensArgs<ExtArgs>
    donation_requests_answered?: boolean | Charities$donation_requests_answeredArgs<ExtArgs>
    donations_received?: boolean | Charities$donations_receivedArgs<ExtArgs>
    ClothingItems?: boolean | Charities$ClothingItemsArgs<ExtArgs>
    _count?: boolean | CharitiesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CharitiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CharitiesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CharitiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Charities"
    objects: {
      applications: Prisma.$CharityApplicationsPayload<ExtArgs>[]
      signup_tokens: Prisma.$CharitySignupTokensPayload<ExtArgs>[]
      donation_requests_answered: Prisma.$DonationRequestPayload<ExtArgs>[]
      donations_received: Prisma.$DonationsPayload<ExtArgs>[]
      ClothingItems: Prisma.$ClothingItemsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      charity_id: number
      name: string
      email: string
      phone: string
      address: string
      website: string
      verified: boolean
      created_on: Date
      updated_on: Date
      password_hash: string | null
    }, ExtArgs["result"]["charities"]>
    composites: {}
  }

  type CharitiesGetPayload<S extends boolean | null | undefined | CharitiesDefaultArgs> = $Result.GetResult<Prisma.$CharitiesPayload, S>

  type CharitiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharitiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharitiesCountAggregateInputType | true
    }

  export interface CharitiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Charities'], meta: { name: 'Charities' } }
    /**
     * Find zero or one Charities that matches the filter.
     * @param {CharitiesFindUniqueArgs} args - Arguments to find a Charities
     * @example
     * // Get one Charities
     * const charities = await prisma.charities.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharitiesFindUniqueArgs>(args: SelectSubset<T, CharitiesFindUniqueArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Charities that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharitiesFindUniqueOrThrowArgs} args - Arguments to find a Charities
     * @example
     * // Get one Charities
     * const charities = await prisma.charities.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharitiesFindUniqueOrThrowArgs>(args: SelectSubset<T, CharitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Charities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesFindFirstArgs} args - Arguments to find a Charities
     * @example
     * // Get one Charities
     * const charities = await prisma.charities.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharitiesFindFirstArgs>(args?: SelectSubset<T, CharitiesFindFirstArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Charities that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesFindFirstOrThrowArgs} args - Arguments to find a Charities
     * @example
     * // Get one Charities
     * const charities = await prisma.charities.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharitiesFindFirstOrThrowArgs>(args?: SelectSubset<T, CharitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Charities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Charities
     * const charities = await prisma.charities.findMany()
     * 
     * // Get first 10 Charities
     * const charities = await prisma.charities.findMany({ take: 10 })
     * 
     * // Only select the `charity_id`
     * const charitiesWithCharity_idOnly = await prisma.charities.findMany({ select: { charity_id: true } })
     * 
     */
    findMany<T extends CharitiesFindManyArgs>(args?: SelectSubset<T, CharitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Charities.
     * @param {CharitiesCreateArgs} args - Arguments to create a Charities.
     * @example
     * // Create one Charities
     * const Charities = await prisma.charities.create({
     *   data: {
     *     // ... data to create a Charities
     *   }
     * })
     * 
     */
    create<T extends CharitiesCreateArgs>(args: SelectSubset<T, CharitiesCreateArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Charities.
     * @param {CharitiesCreateManyArgs} args - Arguments to create many Charities.
     * @example
     * // Create many Charities
     * const charities = await prisma.charities.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharitiesCreateManyArgs>(args?: SelectSubset<T, CharitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Charities and returns the data saved in the database.
     * @param {CharitiesCreateManyAndReturnArgs} args - Arguments to create many Charities.
     * @example
     * // Create many Charities
     * const charities = await prisma.charities.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Charities and only return the `charity_id`
     * const charitiesWithCharity_idOnly = await prisma.charities.createManyAndReturn({
     *   select: { charity_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharitiesCreateManyAndReturnArgs>(args?: SelectSubset<T, CharitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Charities.
     * @param {CharitiesDeleteArgs} args - Arguments to delete one Charities.
     * @example
     * // Delete one Charities
     * const Charities = await prisma.charities.delete({
     *   where: {
     *     // ... filter to delete one Charities
     *   }
     * })
     * 
     */
    delete<T extends CharitiesDeleteArgs>(args: SelectSubset<T, CharitiesDeleteArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Charities.
     * @param {CharitiesUpdateArgs} args - Arguments to update one Charities.
     * @example
     * // Update one Charities
     * const charities = await prisma.charities.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharitiesUpdateArgs>(args: SelectSubset<T, CharitiesUpdateArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Charities.
     * @param {CharitiesDeleteManyArgs} args - Arguments to filter Charities to delete.
     * @example
     * // Delete a few Charities
     * const { count } = await prisma.charities.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharitiesDeleteManyArgs>(args?: SelectSubset<T, CharitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Charities
     * const charities = await prisma.charities.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharitiesUpdateManyArgs>(args: SelectSubset<T, CharitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charities and returns the data updated in the database.
     * @param {CharitiesUpdateManyAndReturnArgs} args - Arguments to update many Charities.
     * @example
     * // Update many Charities
     * const charities = await prisma.charities.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Charities and only return the `charity_id`
     * const charitiesWithCharity_idOnly = await prisma.charities.updateManyAndReturn({
     *   select: { charity_id: true },
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
    updateManyAndReturn<T extends CharitiesUpdateManyAndReturnArgs>(args: SelectSubset<T, CharitiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Charities.
     * @param {CharitiesUpsertArgs} args - Arguments to update or create a Charities.
     * @example
     * // Update or create a Charities
     * const charities = await prisma.charities.upsert({
     *   create: {
     *     // ... data to create a Charities
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Charities we want to update
     *   }
     * })
     */
    upsert<T extends CharitiesUpsertArgs>(args: SelectSubset<T, CharitiesUpsertArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesCountArgs} args - Arguments to filter Charities to count.
     * @example
     * // Count the number of Charities
     * const count = await prisma.charities.count({
     *   where: {
     *     // ... the filter for the Charities we want to count
     *   }
     * })
    **/
    count<T extends CharitiesCountArgs>(
      args?: Subset<T, CharitiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharitiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharitiesAggregateArgs>(args: Subset<T, CharitiesAggregateArgs>): Prisma.PrismaPromise<GetCharitiesAggregateType<T>>

    /**
     * Group by Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitiesGroupByArgs} args - Group by arguments.
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
      T extends CharitiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharitiesGroupByArgs['orderBy'] }
        : { orderBy?: CharitiesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CharitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Charities model
   */
  readonly fields: CharitiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Charities.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharitiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Charities$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Charities$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    signup_tokens<T extends Charities$signup_tokensArgs<ExtArgs> = {}>(args?: Subset<T, Charities$signup_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    donation_requests_answered<T extends Charities$donation_requests_answeredArgs<ExtArgs> = {}>(args?: Subset<T, Charities$donation_requests_answeredArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    donations_received<T extends Charities$donations_receivedArgs<ExtArgs> = {}>(args?: Subset<T, Charities$donations_receivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ClothingItems<T extends Charities$ClothingItemsArgs<ExtArgs> = {}>(args?: Subset<T, Charities$ClothingItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Charities model
   */
  interface CharitiesFieldRefs {
    readonly charity_id: FieldRef<"Charities", 'Int'>
    readonly name: FieldRef<"Charities", 'String'>
    readonly email: FieldRef<"Charities", 'String'>
    readonly phone: FieldRef<"Charities", 'String'>
    readonly address: FieldRef<"Charities", 'String'>
    readonly website: FieldRef<"Charities", 'String'>
    readonly verified: FieldRef<"Charities", 'Boolean'>
    readonly created_on: FieldRef<"Charities", 'DateTime'>
    readonly updated_on: FieldRef<"Charities", 'DateTime'>
    readonly password_hash: FieldRef<"Charities", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Charities findUnique
   */
  export type CharitiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * Filter, which Charities to fetch.
     */
    where: CharitiesWhereUniqueInput
  }

  /**
   * Charities findUniqueOrThrow
   */
  export type CharitiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * Filter, which Charities to fetch.
     */
    where: CharitiesWhereUniqueInput
  }

  /**
   * Charities findFirst
   */
  export type CharitiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * Filter, which Charities to fetch.
     */
    where?: CharitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharitiesOrderByWithRelationInput | CharitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charities.
     */
    cursor?: CharitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charities.
     */
    distinct?: CharitiesScalarFieldEnum | CharitiesScalarFieldEnum[]
  }

  /**
   * Charities findFirstOrThrow
   */
  export type CharitiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * Filter, which Charities to fetch.
     */
    where?: CharitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharitiesOrderByWithRelationInput | CharitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charities.
     */
    cursor?: CharitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charities.
     */
    distinct?: CharitiesScalarFieldEnum | CharitiesScalarFieldEnum[]
  }

  /**
   * Charities findMany
   */
  export type CharitiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * Filter, which Charities to fetch.
     */
    where?: CharitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharitiesOrderByWithRelationInput | CharitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Charities.
     */
    cursor?: CharitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    distinct?: CharitiesScalarFieldEnum | CharitiesScalarFieldEnum[]
  }

  /**
   * Charities create
   */
  export type CharitiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * The data needed to create a Charities.
     */
    data: XOR<CharitiesCreateInput, CharitiesUncheckedCreateInput>
  }

  /**
   * Charities createMany
   */
  export type CharitiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Charities.
     */
    data: CharitiesCreateManyInput | CharitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Charities createManyAndReturn
   */
  export type CharitiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * The data used to create many Charities.
     */
    data: CharitiesCreateManyInput | CharitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Charities update
   */
  export type CharitiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * The data needed to update a Charities.
     */
    data: XOR<CharitiesUpdateInput, CharitiesUncheckedUpdateInput>
    /**
     * Choose, which Charities to update.
     */
    where: CharitiesWhereUniqueInput
  }

  /**
   * Charities updateMany
   */
  export type CharitiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Charities.
     */
    data: XOR<CharitiesUpdateManyMutationInput, CharitiesUncheckedUpdateManyInput>
    /**
     * Filter which Charities to update
     */
    where?: CharitiesWhereInput
    /**
     * Limit how many Charities to update.
     */
    limit?: number
  }

  /**
   * Charities updateManyAndReturn
   */
  export type CharitiesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * The data used to update Charities.
     */
    data: XOR<CharitiesUpdateManyMutationInput, CharitiesUncheckedUpdateManyInput>
    /**
     * Filter which Charities to update
     */
    where?: CharitiesWhereInput
    /**
     * Limit how many Charities to update.
     */
    limit?: number
  }

  /**
   * Charities upsert
   */
  export type CharitiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * The filter to search for the Charities to update in case it exists.
     */
    where: CharitiesWhereUniqueInput
    /**
     * In case the Charities found by the `where` argument doesn't exist, create a new Charities with this data.
     */
    create: XOR<CharitiesCreateInput, CharitiesUncheckedCreateInput>
    /**
     * In case the Charities was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharitiesUpdateInput, CharitiesUncheckedUpdateInput>
  }

  /**
   * Charities delete
   */
  export type CharitiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    /**
     * Filter which Charities to delete.
     */
    where: CharitiesWhereUniqueInput
  }

  /**
   * Charities deleteMany
   */
  export type CharitiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Charities to delete
     */
    where?: CharitiesWhereInput
    /**
     * Limit how many Charities to delete.
     */
    limit?: number
  }

  /**
   * Charities.applications
   */
  export type Charities$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    where?: CharityApplicationsWhereInput
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    cursor?: CharityApplicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharityApplicationsScalarFieldEnum | CharityApplicationsScalarFieldEnum[]
  }

  /**
   * Charities.signup_tokens
   */
  export type Charities$signup_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    where?: CharitySignupTokensWhereInput
    orderBy?: CharitySignupTokensOrderByWithRelationInput | CharitySignupTokensOrderByWithRelationInput[]
    cursor?: CharitySignupTokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharitySignupTokensScalarFieldEnum | CharitySignupTokensScalarFieldEnum[]
  }

  /**
   * Charities.donation_requests_answered
   */
  export type Charities$donation_requests_answeredArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    where?: DonationRequestWhereInput
    orderBy?: DonationRequestOrderByWithRelationInput | DonationRequestOrderByWithRelationInput[]
    cursor?: DonationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationRequestScalarFieldEnum | DonationRequestScalarFieldEnum[]
  }

  /**
   * Charities.donations_received
   */
  export type Charities$donations_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    where?: DonationsWhereInput
    orderBy?: DonationsOrderByWithRelationInput | DonationsOrderByWithRelationInput[]
    cursor?: DonationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationsScalarFieldEnum | DonationsScalarFieldEnum[]
  }

  /**
   * Charities.ClothingItems
   */
  export type Charities$ClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    where?: ClothingItemsWhereInput
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    cursor?: ClothingItemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
  }

  /**
   * Charities without action
   */
  export type CharitiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
  }


  /**
   * Model CharityApplications
   */

  export type AggregateCharityApplications = {
    _count: CharityApplicationsCountAggregateOutputType | null
    _avg: CharityApplicationsAvgAggregateOutputType | null
    _sum: CharityApplicationsSumAggregateOutputType | null
    _min: CharityApplicationsMinAggregateOutputType | null
    _max: CharityApplicationsMaxAggregateOutputType | null
  }

  export type CharityApplicationsAvgAggregateOutputType = {
    application_id: number | null
    reviewed_by: number | null
    approved_by: number | null
    charity_id: number | null
  }

  export type CharityApplicationsSumAggregateOutputType = {
    application_id: number | null
    reviewed_by: number | null
    approved_by: number | null
    charity_id: number | null
  }

  export type CharityApplicationsMinAggregateOutputType = {
    application_id: number | null
    org_name: string | null
    contact_name: string | null
    contact_email: string | null
    contact_number: string | null
    website: string | null
    org_address: string | null
    charity_number: string | null
    status: $Enums.Status | null
    reviewed_on: Date | null
    reviewed_by: number | null
    approved_on: Date | null
    approved_by: number | null
    charity_id: number | null
    created_on: Date | null
    updated_on: Date | null
  }

  export type CharityApplicationsMaxAggregateOutputType = {
    application_id: number | null
    org_name: string | null
    contact_name: string | null
    contact_email: string | null
    contact_number: string | null
    website: string | null
    org_address: string | null
    charity_number: string | null
    status: $Enums.Status | null
    reviewed_on: Date | null
    reviewed_by: number | null
    approved_on: Date | null
    approved_by: number | null
    charity_id: number | null
    created_on: Date | null
    updated_on: Date | null
  }

  export type CharityApplicationsCountAggregateOutputType = {
    application_id: number
    org_name: number
    contact_name: number
    contact_email: number
    contact_number: number
    website: number
    org_address: number
    charity_number: number
    status: number
    reviewed_on: number
    reviewed_by: number
    approved_on: number
    approved_by: number
    charity_id: number
    created_on: number
    updated_on: number
    _all: number
  }


  export type CharityApplicationsAvgAggregateInputType = {
    application_id?: true
    reviewed_by?: true
    approved_by?: true
    charity_id?: true
  }

  export type CharityApplicationsSumAggregateInputType = {
    application_id?: true
    reviewed_by?: true
    approved_by?: true
    charity_id?: true
  }

  export type CharityApplicationsMinAggregateInputType = {
    application_id?: true
    org_name?: true
    contact_name?: true
    contact_email?: true
    contact_number?: true
    website?: true
    org_address?: true
    charity_number?: true
    status?: true
    reviewed_on?: true
    reviewed_by?: true
    approved_on?: true
    approved_by?: true
    charity_id?: true
    created_on?: true
    updated_on?: true
  }

  export type CharityApplicationsMaxAggregateInputType = {
    application_id?: true
    org_name?: true
    contact_name?: true
    contact_email?: true
    contact_number?: true
    website?: true
    org_address?: true
    charity_number?: true
    status?: true
    reviewed_on?: true
    reviewed_by?: true
    approved_on?: true
    approved_by?: true
    charity_id?: true
    created_on?: true
    updated_on?: true
  }

  export type CharityApplicationsCountAggregateInputType = {
    application_id?: true
    org_name?: true
    contact_name?: true
    contact_email?: true
    contact_number?: true
    website?: true
    org_address?: true
    charity_number?: true
    status?: true
    reviewed_on?: true
    reviewed_by?: true
    approved_on?: true
    approved_by?: true
    charity_id?: true
    created_on?: true
    updated_on?: true
    _all?: true
  }

  export type CharityApplicationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharityApplications to aggregate.
     */
    where?: CharityApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharityApplications to fetch.
     */
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharityApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharityApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharityApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CharityApplications
    **/
    _count?: true | CharityApplicationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharityApplicationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharityApplicationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharityApplicationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharityApplicationsMaxAggregateInputType
  }

  export type GetCharityApplicationsAggregateType<T extends CharityApplicationsAggregateArgs> = {
        [P in keyof T & keyof AggregateCharityApplications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharityApplications[P]>
      : GetScalarType<T[P], AggregateCharityApplications[P]>
  }




  export type CharityApplicationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharityApplicationsWhereInput
    orderBy?: CharityApplicationsOrderByWithAggregationInput | CharityApplicationsOrderByWithAggregationInput[]
    by: CharityApplicationsScalarFieldEnum[] | CharityApplicationsScalarFieldEnum
    having?: CharityApplicationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharityApplicationsCountAggregateInputType | true
    _avg?: CharityApplicationsAvgAggregateInputType
    _sum?: CharityApplicationsSumAggregateInputType
    _min?: CharityApplicationsMinAggregateInputType
    _max?: CharityApplicationsMaxAggregateInputType
  }

  export type CharityApplicationsGroupByOutputType = {
    application_id: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number: string | null
    status: $Enums.Status
    reviewed_on: Date | null
    reviewed_by: number | null
    approved_on: Date | null
    approved_by: number | null
    charity_id: number | null
    created_on: Date
    updated_on: Date
    _count: CharityApplicationsCountAggregateOutputType | null
    _avg: CharityApplicationsAvgAggregateOutputType | null
    _sum: CharityApplicationsSumAggregateOutputType | null
    _min: CharityApplicationsMinAggregateOutputType | null
    _max: CharityApplicationsMaxAggregateOutputType | null
  }

  type GetCharityApplicationsGroupByPayload<T extends CharityApplicationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharityApplicationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharityApplicationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharityApplicationsGroupByOutputType[P]>
            : GetScalarType<T[P], CharityApplicationsGroupByOutputType[P]>
        }
      >
    >


  export type CharityApplicationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    application_id?: boolean
    org_name?: boolean
    contact_name?: boolean
    contact_email?: boolean
    contact_number?: boolean
    website?: boolean
    org_address?: boolean
    charity_number?: boolean
    status?: boolean
    reviewed_on?: boolean
    reviewed_by?: boolean
    approved_on?: boolean
    approved_by?: boolean
    charity_id?: boolean
    created_on?: boolean
    updated_on?: boolean
    approver?: boolean | CharityApplications$approverArgs<ExtArgs>
    reviewer?: boolean | CharityApplications$reviewerArgs<ExtArgs>
    charity?: boolean | CharityApplications$charityArgs<ExtArgs>
  }, ExtArgs["result"]["charityApplications"]>

  export type CharityApplicationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    application_id?: boolean
    org_name?: boolean
    contact_name?: boolean
    contact_email?: boolean
    contact_number?: boolean
    website?: boolean
    org_address?: boolean
    charity_number?: boolean
    status?: boolean
    reviewed_on?: boolean
    reviewed_by?: boolean
    approved_on?: boolean
    approved_by?: boolean
    charity_id?: boolean
    created_on?: boolean
    updated_on?: boolean
    approver?: boolean | CharityApplications$approverArgs<ExtArgs>
    reviewer?: boolean | CharityApplications$reviewerArgs<ExtArgs>
    charity?: boolean | CharityApplications$charityArgs<ExtArgs>
  }, ExtArgs["result"]["charityApplications"]>

  export type CharityApplicationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    application_id?: boolean
    org_name?: boolean
    contact_name?: boolean
    contact_email?: boolean
    contact_number?: boolean
    website?: boolean
    org_address?: boolean
    charity_number?: boolean
    status?: boolean
    reviewed_on?: boolean
    reviewed_by?: boolean
    approved_on?: boolean
    approved_by?: boolean
    charity_id?: boolean
    created_on?: boolean
    updated_on?: boolean
    approver?: boolean | CharityApplications$approverArgs<ExtArgs>
    reviewer?: boolean | CharityApplications$reviewerArgs<ExtArgs>
    charity?: boolean | CharityApplications$charityArgs<ExtArgs>
  }, ExtArgs["result"]["charityApplications"]>

  export type CharityApplicationsSelectScalar = {
    application_id?: boolean
    org_name?: boolean
    contact_name?: boolean
    contact_email?: boolean
    contact_number?: boolean
    website?: boolean
    org_address?: boolean
    charity_number?: boolean
    status?: boolean
    reviewed_on?: boolean
    reviewed_by?: boolean
    approved_on?: boolean
    approved_by?: boolean
    charity_id?: boolean
    created_on?: boolean
    updated_on?: boolean
  }

  export type CharityApplicationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"application_id" | "org_name" | "contact_name" | "contact_email" | "contact_number" | "website" | "org_address" | "charity_number" | "status" | "reviewed_on" | "reviewed_by" | "approved_on" | "approved_by" | "charity_id" | "created_on" | "updated_on", ExtArgs["result"]["charityApplications"]>
  export type CharityApplicationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | CharityApplications$approverArgs<ExtArgs>
    reviewer?: boolean | CharityApplications$reviewerArgs<ExtArgs>
    charity?: boolean | CharityApplications$charityArgs<ExtArgs>
  }
  export type CharityApplicationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | CharityApplications$approverArgs<ExtArgs>
    reviewer?: boolean | CharityApplications$reviewerArgs<ExtArgs>
    charity?: boolean | CharityApplications$charityArgs<ExtArgs>
  }
  export type CharityApplicationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | CharityApplications$approverArgs<ExtArgs>
    reviewer?: boolean | CharityApplications$reviewerArgs<ExtArgs>
    charity?: boolean | CharityApplications$charityArgs<ExtArgs>
  }

  export type $CharityApplicationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CharityApplications"
    objects: {
      approver: Prisma.$UserPayload<ExtArgs> | null
      reviewer: Prisma.$UserPayload<ExtArgs> | null
      charity: Prisma.$CharitiesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      application_id: number
      org_name: string
      contact_name: string
      contact_email: string
      contact_number: string
      website: string
      org_address: string
      charity_number: string | null
      status: $Enums.Status
      reviewed_on: Date | null
      reviewed_by: number | null
      approved_on: Date | null
      approved_by: number | null
      charity_id: number | null
      created_on: Date
      updated_on: Date
    }, ExtArgs["result"]["charityApplications"]>
    composites: {}
  }

  type CharityApplicationsGetPayload<S extends boolean | null | undefined | CharityApplicationsDefaultArgs> = $Result.GetResult<Prisma.$CharityApplicationsPayload, S>

  type CharityApplicationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharityApplicationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharityApplicationsCountAggregateInputType | true
    }

  export interface CharityApplicationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CharityApplications'], meta: { name: 'CharityApplications' } }
    /**
     * Find zero or one CharityApplications that matches the filter.
     * @param {CharityApplicationsFindUniqueArgs} args - Arguments to find a CharityApplications
     * @example
     * // Get one CharityApplications
     * const charityApplications = await prisma.charityApplications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharityApplicationsFindUniqueArgs>(args: SelectSubset<T, CharityApplicationsFindUniqueArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CharityApplications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharityApplicationsFindUniqueOrThrowArgs} args - Arguments to find a CharityApplications
     * @example
     * // Get one CharityApplications
     * const charityApplications = await prisma.charityApplications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharityApplicationsFindUniqueOrThrowArgs>(args: SelectSubset<T, CharityApplicationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharityApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsFindFirstArgs} args - Arguments to find a CharityApplications
     * @example
     * // Get one CharityApplications
     * const charityApplications = await prisma.charityApplications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharityApplicationsFindFirstArgs>(args?: SelectSubset<T, CharityApplicationsFindFirstArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharityApplications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsFindFirstOrThrowArgs} args - Arguments to find a CharityApplications
     * @example
     * // Get one CharityApplications
     * const charityApplications = await prisma.charityApplications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharityApplicationsFindFirstOrThrowArgs>(args?: SelectSubset<T, CharityApplicationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CharityApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CharityApplications
     * const charityApplications = await prisma.charityApplications.findMany()
     * 
     * // Get first 10 CharityApplications
     * const charityApplications = await prisma.charityApplications.findMany({ take: 10 })
     * 
     * // Only select the `application_id`
     * const charityApplicationsWithApplication_idOnly = await prisma.charityApplications.findMany({ select: { application_id: true } })
     * 
     */
    findMany<T extends CharityApplicationsFindManyArgs>(args?: SelectSubset<T, CharityApplicationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CharityApplications.
     * @param {CharityApplicationsCreateArgs} args - Arguments to create a CharityApplications.
     * @example
     * // Create one CharityApplications
     * const CharityApplications = await prisma.charityApplications.create({
     *   data: {
     *     // ... data to create a CharityApplications
     *   }
     * })
     * 
     */
    create<T extends CharityApplicationsCreateArgs>(args: SelectSubset<T, CharityApplicationsCreateArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CharityApplications.
     * @param {CharityApplicationsCreateManyArgs} args - Arguments to create many CharityApplications.
     * @example
     * // Create many CharityApplications
     * const charityApplications = await prisma.charityApplications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharityApplicationsCreateManyArgs>(args?: SelectSubset<T, CharityApplicationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CharityApplications and returns the data saved in the database.
     * @param {CharityApplicationsCreateManyAndReturnArgs} args - Arguments to create many CharityApplications.
     * @example
     * // Create many CharityApplications
     * const charityApplications = await prisma.charityApplications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CharityApplications and only return the `application_id`
     * const charityApplicationsWithApplication_idOnly = await prisma.charityApplications.createManyAndReturn({
     *   select: { application_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharityApplicationsCreateManyAndReturnArgs>(args?: SelectSubset<T, CharityApplicationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CharityApplications.
     * @param {CharityApplicationsDeleteArgs} args - Arguments to delete one CharityApplications.
     * @example
     * // Delete one CharityApplications
     * const CharityApplications = await prisma.charityApplications.delete({
     *   where: {
     *     // ... filter to delete one CharityApplications
     *   }
     * })
     * 
     */
    delete<T extends CharityApplicationsDeleteArgs>(args: SelectSubset<T, CharityApplicationsDeleteArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CharityApplications.
     * @param {CharityApplicationsUpdateArgs} args - Arguments to update one CharityApplications.
     * @example
     * // Update one CharityApplications
     * const charityApplications = await prisma.charityApplications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharityApplicationsUpdateArgs>(args: SelectSubset<T, CharityApplicationsUpdateArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CharityApplications.
     * @param {CharityApplicationsDeleteManyArgs} args - Arguments to filter CharityApplications to delete.
     * @example
     * // Delete a few CharityApplications
     * const { count } = await prisma.charityApplications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharityApplicationsDeleteManyArgs>(args?: SelectSubset<T, CharityApplicationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharityApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CharityApplications
     * const charityApplications = await prisma.charityApplications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharityApplicationsUpdateManyArgs>(args: SelectSubset<T, CharityApplicationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharityApplications and returns the data updated in the database.
     * @param {CharityApplicationsUpdateManyAndReturnArgs} args - Arguments to update many CharityApplications.
     * @example
     * // Update many CharityApplications
     * const charityApplications = await prisma.charityApplications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CharityApplications and only return the `application_id`
     * const charityApplicationsWithApplication_idOnly = await prisma.charityApplications.updateManyAndReturn({
     *   select: { application_id: true },
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
    updateManyAndReturn<T extends CharityApplicationsUpdateManyAndReturnArgs>(args: SelectSubset<T, CharityApplicationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CharityApplications.
     * @param {CharityApplicationsUpsertArgs} args - Arguments to update or create a CharityApplications.
     * @example
     * // Update or create a CharityApplications
     * const charityApplications = await prisma.charityApplications.upsert({
     *   create: {
     *     // ... data to create a CharityApplications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CharityApplications we want to update
     *   }
     * })
     */
    upsert<T extends CharityApplicationsUpsertArgs>(args: SelectSubset<T, CharityApplicationsUpsertArgs<ExtArgs>>): Prisma__CharityApplicationsClient<$Result.GetResult<Prisma.$CharityApplicationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CharityApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsCountArgs} args - Arguments to filter CharityApplications to count.
     * @example
     * // Count the number of CharityApplications
     * const count = await prisma.charityApplications.count({
     *   where: {
     *     // ... the filter for the CharityApplications we want to count
     *   }
     * })
    **/
    count<T extends CharityApplicationsCountArgs>(
      args?: Subset<T, CharityApplicationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharityApplicationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CharityApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharityApplicationsAggregateArgs>(args: Subset<T, CharityApplicationsAggregateArgs>): Prisma.PrismaPromise<GetCharityApplicationsAggregateType<T>>

    /**
     * Group by CharityApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityApplicationsGroupByArgs} args - Group by arguments.
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
      T extends CharityApplicationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharityApplicationsGroupByArgs['orderBy'] }
        : { orderBy?: CharityApplicationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CharityApplicationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharityApplicationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CharityApplications model
   */
  readonly fields: CharityApplicationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CharityApplications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharityApplicationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    approver<T extends CharityApplications$approverArgs<ExtArgs> = {}>(args?: Subset<T, CharityApplications$approverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reviewer<T extends CharityApplications$reviewerArgs<ExtArgs> = {}>(args?: Subset<T, CharityApplications$reviewerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    charity<T extends CharityApplications$charityArgs<ExtArgs> = {}>(args?: Subset<T, CharityApplications$charityArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CharityApplications model
   */
  interface CharityApplicationsFieldRefs {
    readonly application_id: FieldRef<"CharityApplications", 'Int'>
    readonly org_name: FieldRef<"CharityApplications", 'String'>
    readonly contact_name: FieldRef<"CharityApplications", 'String'>
    readonly contact_email: FieldRef<"CharityApplications", 'String'>
    readonly contact_number: FieldRef<"CharityApplications", 'String'>
    readonly website: FieldRef<"CharityApplications", 'String'>
    readonly org_address: FieldRef<"CharityApplications", 'String'>
    readonly charity_number: FieldRef<"CharityApplications", 'String'>
    readonly status: FieldRef<"CharityApplications", 'Status'>
    readonly reviewed_on: FieldRef<"CharityApplications", 'DateTime'>
    readonly reviewed_by: FieldRef<"CharityApplications", 'Int'>
    readonly approved_on: FieldRef<"CharityApplications", 'DateTime'>
    readonly approved_by: FieldRef<"CharityApplications", 'Int'>
    readonly charity_id: FieldRef<"CharityApplications", 'Int'>
    readonly created_on: FieldRef<"CharityApplications", 'DateTime'>
    readonly updated_on: FieldRef<"CharityApplications", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CharityApplications findUnique
   */
  export type CharityApplicationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which CharityApplications to fetch.
     */
    where: CharityApplicationsWhereUniqueInput
  }

  /**
   * CharityApplications findUniqueOrThrow
   */
  export type CharityApplicationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which CharityApplications to fetch.
     */
    where: CharityApplicationsWhereUniqueInput
  }

  /**
   * CharityApplications findFirst
   */
  export type CharityApplicationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which CharityApplications to fetch.
     */
    where?: CharityApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharityApplications to fetch.
     */
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharityApplications.
     */
    cursor?: CharityApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharityApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharityApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharityApplications.
     */
    distinct?: CharityApplicationsScalarFieldEnum | CharityApplicationsScalarFieldEnum[]
  }

  /**
   * CharityApplications findFirstOrThrow
   */
  export type CharityApplicationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which CharityApplications to fetch.
     */
    where?: CharityApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharityApplications to fetch.
     */
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharityApplications.
     */
    cursor?: CharityApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharityApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharityApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharityApplications.
     */
    distinct?: CharityApplicationsScalarFieldEnum | CharityApplicationsScalarFieldEnum[]
  }

  /**
   * CharityApplications findMany
   */
  export type CharityApplicationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which CharityApplications to fetch.
     */
    where?: CharityApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharityApplications to fetch.
     */
    orderBy?: CharityApplicationsOrderByWithRelationInput | CharityApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CharityApplications.
     */
    cursor?: CharityApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharityApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharityApplications.
     */
    skip?: number
    distinct?: CharityApplicationsScalarFieldEnum | CharityApplicationsScalarFieldEnum[]
  }

  /**
   * CharityApplications create
   */
  export type CharityApplicationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * The data needed to create a CharityApplications.
     */
    data: XOR<CharityApplicationsCreateInput, CharityApplicationsUncheckedCreateInput>
  }

  /**
   * CharityApplications createMany
   */
  export type CharityApplicationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CharityApplications.
     */
    data: CharityApplicationsCreateManyInput | CharityApplicationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CharityApplications createManyAndReturn
   */
  export type CharityApplicationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * The data used to create many CharityApplications.
     */
    data: CharityApplicationsCreateManyInput | CharityApplicationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharityApplications update
   */
  export type CharityApplicationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * The data needed to update a CharityApplications.
     */
    data: XOR<CharityApplicationsUpdateInput, CharityApplicationsUncheckedUpdateInput>
    /**
     * Choose, which CharityApplications to update.
     */
    where: CharityApplicationsWhereUniqueInput
  }

  /**
   * CharityApplications updateMany
   */
  export type CharityApplicationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CharityApplications.
     */
    data: XOR<CharityApplicationsUpdateManyMutationInput, CharityApplicationsUncheckedUpdateManyInput>
    /**
     * Filter which CharityApplications to update
     */
    where?: CharityApplicationsWhereInput
    /**
     * Limit how many CharityApplications to update.
     */
    limit?: number
  }

  /**
   * CharityApplications updateManyAndReturn
   */
  export type CharityApplicationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * The data used to update CharityApplications.
     */
    data: XOR<CharityApplicationsUpdateManyMutationInput, CharityApplicationsUncheckedUpdateManyInput>
    /**
     * Filter which CharityApplications to update
     */
    where?: CharityApplicationsWhereInput
    /**
     * Limit how many CharityApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharityApplications upsert
   */
  export type CharityApplicationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * The filter to search for the CharityApplications to update in case it exists.
     */
    where: CharityApplicationsWhereUniqueInput
    /**
     * In case the CharityApplications found by the `where` argument doesn't exist, create a new CharityApplications with this data.
     */
    create: XOR<CharityApplicationsCreateInput, CharityApplicationsUncheckedCreateInput>
    /**
     * In case the CharityApplications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharityApplicationsUpdateInput, CharityApplicationsUncheckedUpdateInput>
  }

  /**
   * CharityApplications delete
   */
  export type CharityApplicationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
    /**
     * Filter which CharityApplications to delete.
     */
    where: CharityApplicationsWhereUniqueInput
  }

  /**
   * CharityApplications deleteMany
   */
  export type CharityApplicationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharityApplications to delete
     */
    where?: CharityApplicationsWhereInput
    /**
     * Limit how many CharityApplications to delete.
     */
    limit?: number
  }

  /**
   * CharityApplications.approver
   */
  export type CharityApplications$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * CharityApplications.reviewer
   */
  export type CharityApplications$reviewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * CharityApplications.charity
   */
  export type CharityApplications$charityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    where?: CharitiesWhereInput
  }

  /**
   * CharityApplications without action
   */
  export type CharityApplicationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityApplications
     */
    select?: CharityApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharityApplications
     */
    omit?: CharityApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityApplicationsInclude<ExtArgs> | null
  }


  /**
   * Model CharitySignupTokens
   */

  export type AggregateCharitySignupTokens = {
    _count: CharitySignupTokensCountAggregateOutputType | null
    _avg: CharitySignupTokensAvgAggregateOutputType | null
    _sum: CharitySignupTokensSumAggregateOutputType | null
    _min: CharitySignupTokensMinAggregateOutputType | null
    _max: CharitySignupTokensMaxAggregateOutputType | null
  }

  export type CharitySignupTokensAvgAggregateOutputType = {
    invite_id: number | null
    charity_id: number | null
    created_by: number | null
  }

  export type CharitySignupTokensSumAggregateOutputType = {
    invite_id: number | null
    charity_id: number | null
    created_by: number | null
  }

  export type CharitySignupTokensMinAggregateOutputType = {
    invite_id: number | null
    charity_id: number | null
    email: string | null
    token: string | null
    expires_on: Date | null
    consumed_on: Date | null
    created_on: Date | null
    created_by: number | null
  }

  export type CharitySignupTokensMaxAggregateOutputType = {
    invite_id: number | null
    charity_id: number | null
    email: string | null
    token: string | null
    expires_on: Date | null
    consumed_on: Date | null
    created_on: Date | null
    created_by: number | null
  }

  export type CharitySignupTokensCountAggregateOutputType = {
    invite_id: number
    charity_id: number
    email: number
    token: number
    expires_on: number
    consumed_on: number
    created_on: number
    created_by: number
    _all: number
  }


  export type CharitySignupTokensAvgAggregateInputType = {
    invite_id?: true
    charity_id?: true
    created_by?: true
  }

  export type CharitySignupTokensSumAggregateInputType = {
    invite_id?: true
    charity_id?: true
    created_by?: true
  }

  export type CharitySignupTokensMinAggregateInputType = {
    invite_id?: true
    charity_id?: true
    email?: true
    token?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
    created_by?: true
  }

  export type CharitySignupTokensMaxAggregateInputType = {
    invite_id?: true
    charity_id?: true
    email?: true
    token?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
    created_by?: true
  }

  export type CharitySignupTokensCountAggregateInputType = {
    invite_id?: true
    charity_id?: true
    email?: true
    token?: true
    expires_on?: true
    consumed_on?: true
    created_on?: true
    created_by?: true
    _all?: true
  }

  export type CharitySignupTokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharitySignupTokens to aggregate.
     */
    where?: CharitySignupTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharitySignupTokens to fetch.
     */
    orderBy?: CharitySignupTokensOrderByWithRelationInput | CharitySignupTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharitySignupTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharitySignupTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharitySignupTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CharitySignupTokens
    **/
    _count?: true | CharitySignupTokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharitySignupTokensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharitySignupTokensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharitySignupTokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharitySignupTokensMaxAggregateInputType
  }

  export type GetCharitySignupTokensAggregateType<T extends CharitySignupTokensAggregateArgs> = {
        [P in keyof T & keyof AggregateCharitySignupTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharitySignupTokens[P]>
      : GetScalarType<T[P], AggregateCharitySignupTokens[P]>
  }




  export type CharitySignupTokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharitySignupTokensWhereInput
    orderBy?: CharitySignupTokensOrderByWithAggregationInput | CharitySignupTokensOrderByWithAggregationInput[]
    by: CharitySignupTokensScalarFieldEnum[] | CharitySignupTokensScalarFieldEnum
    having?: CharitySignupTokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharitySignupTokensCountAggregateInputType | true
    _avg?: CharitySignupTokensAvgAggregateInputType
    _sum?: CharitySignupTokensSumAggregateInputType
    _min?: CharitySignupTokensMinAggregateInputType
    _max?: CharitySignupTokensMaxAggregateInputType
  }

  export type CharitySignupTokensGroupByOutputType = {
    invite_id: number
    charity_id: number
    email: string
    token: string
    expires_on: Date
    consumed_on: Date | null
    created_on: Date
    created_by: number | null
    _count: CharitySignupTokensCountAggregateOutputType | null
    _avg: CharitySignupTokensAvgAggregateOutputType | null
    _sum: CharitySignupTokensSumAggregateOutputType | null
    _min: CharitySignupTokensMinAggregateOutputType | null
    _max: CharitySignupTokensMaxAggregateOutputType | null
  }

  type GetCharitySignupTokensGroupByPayload<T extends CharitySignupTokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharitySignupTokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharitySignupTokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharitySignupTokensGroupByOutputType[P]>
            : GetScalarType<T[P], CharitySignupTokensGroupByOutputType[P]>
        }
      >
    >


  export type CharitySignupTokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    invite_id?: boolean
    charity_id?: boolean
    email?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    created_by?: boolean
    charity?: boolean | CharitiesDefaultArgs<ExtArgs>
    creator?: boolean | CharitySignupTokens$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["charitySignupTokens"]>

  export type CharitySignupTokensSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    invite_id?: boolean
    charity_id?: boolean
    email?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    created_by?: boolean
    charity?: boolean | CharitiesDefaultArgs<ExtArgs>
    creator?: boolean | CharitySignupTokens$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["charitySignupTokens"]>

  export type CharitySignupTokensSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    invite_id?: boolean
    charity_id?: boolean
    email?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    created_by?: boolean
    charity?: boolean | CharitiesDefaultArgs<ExtArgs>
    creator?: boolean | CharitySignupTokens$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["charitySignupTokens"]>

  export type CharitySignupTokensSelectScalar = {
    invite_id?: boolean
    charity_id?: boolean
    email?: boolean
    token?: boolean
    expires_on?: boolean
    consumed_on?: boolean
    created_on?: boolean
    created_by?: boolean
  }

  export type CharitySignupTokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"invite_id" | "charity_id" | "email" | "token" | "expires_on" | "consumed_on" | "created_on" | "created_by", ExtArgs["result"]["charitySignupTokens"]>
  export type CharitySignupTokensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    charity?: boolean | CharitiesDefaultArgs<ExtArgs>
    creator?: boolean | CharitySignupTokens$creatorArgs<ExtArgs>
  }
  export type CharitySignupTokensIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    charity?: boolean | CharitiesDefaultArgs<ExtArgs>
    creator?: boolean | CharitySignupTokens$creatorArgs<ExtArgs>
  }
  export type CharitySignupTokensIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    charity?: boolean | CharitiesDefaultArgs<ExtArgs>
    creator?: boolean | CharitySignupTokens$creatorArgs<ExtArgs>
  }

  export type $CharitySignupTokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CharitySignupTokens"
    objects: {
      charity: Prisma.$CharitiesPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      invite_id: number
      charity_id: number
      email: string
      token: string
      expires_on: Date
      consumed_on: Date | null
      created_on: Date
      created_by: number | null
    }, ExtArgs["result"]["charitySignupTokens"]>
    composites: {}
  }

  type CharitySignupTokensGetPayload<S extends boolean | null | undefined | CharitySignupTokensDefaultArgs> = $Result.GetResult<Prisma.$CharitySignupTokensPayload, S>

  type CharitySignupTokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharitySignupTokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharitySignupTokensCountAggregateInputType | true
    }

  export interface CharitySignupTokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CharitySignupTokens'], meta: { name: 'CharitySignupTokens' } }
    /**
     * Find zero or one CharitySignupTokens that matches the filter.
     * @param {CharitySignupTokensFindUniqueArgs} args - Arguments to find a CharitySignupTokens
     * @example
     * // Get one CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharitySignupTokensFindUniqueArgs>(args: SelectSubset<T, CharitySignupTokensFindUniqueArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CharitySignupTokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharitySignupTokensFindUniqueOrThrowArgs} args - Arguments to find a CharitySignupTokens
     * @example
     * // Get one CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharitySignupTokensFindUniqueOrThrowArgs>(args: SelectSubset<T, CharitySignupTokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharitySignupTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensFindFirstArgs} args - Arguments to find a CharitySignupTokens
     * @example
     * // Get one CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharitySignupTokensFindFirstArgs>(args?: SelectSubset<T, CharitySignupTokensFindFirstArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CharitySignupTokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensFindFirstOrThrowArgs} args - Arguments to find a CharitySignupTokens
     * @example
     * // Get one CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharitySignupTokensFindFirstOrThrowArgs>(args?: SelectSubset<T, CharitySignupTokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CharitySignupTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.findMany()
     * 
     * // Get first 10 CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.findMany({ take: 10 })
     * 
     * // Only select the `invite_id`
     * const charitySignupTokensWithInvite_idOnly = await prisma.charitySignupTokens.findMany({ select: { invite_id: true } })
     * 
     */
    findMany<T extends CharitySignupTokensFindManyArgs>(args?: SelectSubset<T, CharitySignupTokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CharitySignupTokens.
     * @param {CharitySignupTokensCreateArgs} args - Arguments to create a CharitySignupTokens.
     * @example
     * // Create one CharitySignupTokens
     * const CharitySignupTokens = await prisma.charitySignupTokens.create({
     *   data: {
     *     // ... data to create a CharitySignupTokens
     *   }
     * })
     * 
     */
    create<T extends CharitySignupTokensCreateArgs>(args: SelectSubset<T, CharitySignupTokensCreateArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CharitySignupTokens.
     * @param {CharitySignupTokensCreateManyArgs} args - Arguments to create many CharitySignupTokens.
     * @example
     * // Create many CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharitySignupTokensCreateManyArgs>(args?: SelectSubset<T, CharitySignupTokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CharitySignupTokens and returns the data saved in the database.
     * @param {CharitySignupTokensCreateManyAndReturnArgs} args - Arguments to create many CharitySignupTokens.
     * @example
     * // Create many CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CharitySignupTokens and only return the `invite_id`
     * const charitySignupTokensWithInvite_idOnly = await prisma.charitySignupTokens.createManyAndReturn({
     *   select: { invite_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharitySignupTokensCreateManyAndReturnArgs>(args?: SelectSubset<T, CharitySignupTokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CharitySignupTokens.
     * @param {CharitySignupTokensDeleteArgs} args - Arguments to delete one CharitySignupTokens.
     * @example
     * // Delete one CharitySignupTokens
     * const CharitySignupTokens = await prisma.charitySignupTokens.delete({
     *   where: {
     *     // ... filter to delete one CharitySignupTokens
     *   }
     * })
     * 
     */
    delete<T extends CharitySignupTokensDeleteArgs>(args: SelectSubset<T, CharitySignupTokensDeleteArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CharitySignupTokens.
     * @param {CharitySignupTokensUpdateArgs} args - Arguments to update one CharitySignupTokens.
     * @example
     * // Update one CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharitySignupTokensUpdateArgs>(args: SelectSubset<T, CharitySignupTokensUpdateArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CharitySignupTokens.
     * @param {CharitySignupTokensDeleteManyArgs} args - Arguments to filter CharitySignupTokens to delete.
     * @example
     * // Delete a few CharitySignupTokens
     * const { count } = await prisma.charitySignupTokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharitySignupTokensDeleteManyArgs>(args?: SelectSubset<T, CharitySignupTokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharitySignupTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharitySignupTokensUpdateManyArgs>(args: SelectSubset<T, CharitySignupTokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharitySignupTokens and returns the data updated in the database.
     * @param {CharitySignupTokensUpdateManyAndReturnArgs} args - Arguments to update many CharitySignupTokens.
     * @example
     * // Update many CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CharitySignupTokens and only return the `invite_id`
     * const charitySignupTokensWithInvite_idOnly = await prisma.charitySignupTokens.updateManyAndReturn({
     *   select: { invite_id: true },
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
    updateManyAndReturn<T extends CharitySignupTokensUpdateManyAndReturnArgs>(args: SelectSubset<T, CharitySignupTokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CharitySignupTokens.
     * @param {CharitySignupTokensUpsertArgs} args - Arguments to update or create a CharitySignupTokens.
     * @example
     * // Update or create a CharitySignupTokens
     * const charitySignupTokens = await prisma.charitySignupTokens.upsert({
     *   create: {
     *     // ... data to create a CharitySignupTokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CharitySignupTokens we want to update
     *   }
     * })
     */
    upsert<T extends CharitySignupTokensUpsertArgs>(args: SelectSubset<T, CharitySignupTokensUpsertArgs<ExtArgs>>): Prisma__CharitySignupTokensClient<$Result.GetResult<Prisma.$CharitySignupTokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CharitySignupTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensCountArgs} args - Arguments to filter CharitySignupTokens to count.
     * @example
     * // Count the number of CharitySignupTokens
     * const count = await prisma.charitySignupTokens.count({
     *   where: {
     *     // ... the filter for the CharitySignupTokens we want to count
     *   }
     * })
    **/
    count<T extends CharitySignupTokensCountArgs>(
      args?: Subset<T, CharitySignupTokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharitySignupTokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CharitySignupTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharitySignupTokensAggregateArgs>(args: Subset<T, CharitySignupTokensAggregateArgs>): Prisma.PrismaPromise<GetCharitySignupTokensAggregateType<T>>

    /**
     * Group by CharitySignupTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharitySignupTokensGroupByArgs} args - Group by arguments.
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
      T extends CharitySignupTokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharitySignupTokensGroupByArgs['orderBy'] }
        : { orderBy?: CharitySignupTokensGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CharitySignupTokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharitySignupTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CharitySignupTokens model
   */
  readonly fields: CharitySignupTokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CharitySignupTokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharitySignupTokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    charity<T extends CharitiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CharitiesDefaultArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends CharitySignupTokens$creatorArgs<ExtArgs> = {}>(args?: Subset<T, CharitySignupTokens$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CharitySignupTokens model
   */
  interface CharitySignupTokensFieldRefs {
    readonly invite_id: FieldRef<"CharitySignupTokens", 'Int'>
    readonly charity_id: FieldRef<"CharitySignupTokens", 'Int'>
    readonly email: FieldRef<"CharitySignupTokens", 'String'>
    readonly token: FieldRef<"CharitySignupTokens", 'String'>
    readonly expires_on: FieldRef<"CharitySignupTokens", 'DateTime'>
    readonly consumed_on: FieldRef<"CharitySignupTokens", 'DateTime'>
    readonly created_on: FieldRef<"CharitySignupTokens", 'DateTime'>
    readonly created_by: FieldRef<"CharitySignupTokens", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CharitySignupTokens findUnique
   */
  export type CharitySignupTokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * Filter, which CharitySignupTokens to fetch.
     */
    where: CharitySignupTokensWhereUniqueInput
  }

  /**
   * CharitySignupTokens findUniqueOrThrow
   */
  export type CharitySignupTokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * Filter, which CharitySignupTokens to fetch.
     */
    where: CharitySignupTokensWhereUniqueInput
  }

  /**
   * CharitySignupTokens findFirst
   */
  export type CharitySignupTokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * Filter, which CharitySignupTokens to fetch.
     */
    where?: CharitySignupTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharitySignupTokens to fetch.
     */
    orderBy?: CharitySignupTokensOrderByWithRelationInput | CharitySignupTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharitySignupTokens.
     */
    cursor?: CharitySignupTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharitySignupTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharitySignupTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharitySignupTokens.
     */
    distinct?: CharitySignupTokensScalarFieldEnum | CharitySignupTokensScalarFieldEnum[]
  }

  /**
   * CharitySignupTokens findFirstOrThrow
   */
  export type CharitySignupTokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * Filter, which CharitySignupTokens to fetch.
     */
    where?: CharitySignupTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharitySignupTokens to fetch.
     */
    orderBy?: CharitySignupTokensOrderByWithRelationInput | CharitySignupTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CharitySignupTokens.
     */
    cursor?: CharitySignupTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharitySignupTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharitySignupTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CharitySignupTokens.
     */
    distinct?: CharitySignupTokensScalarFieldEnum | CharitySignupTokensScalarFieldEnum[]
  }

  /**
   * CharitySignupTokens findMany
   */
  export type CharitySignupTokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * Filter, which CharitySignupTokens to fetch.
     */
    where?: CharitySignupTokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CharitySignupTokens to fetch.
     */
    orderBy?: CharitySignupTokensOrderByWithRelationInput | CharitySignupTokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CharitySignupTokens.
     */
    cursor?: CharitySignupTokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CharitySignupTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CharitySignupTokens.
     */
    skip?: number
    distinct?: CharitySignupTokensScalarFieldEnum | CharitySignupTokensScalarFieldEnum[]
  }

  /**
   * CharitySignupTokens create
   */
  export type CharitySignupTokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * The data needed to create a CharitySignupTokens.
     */
    data: XOR<CharitySignupTokensCreateInput, CharitySignupTokensUncheckedCreateInput>
  }

  /**
   * CharitySignupTokens createMany
   */
  export type CharitySignupTokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CharitySignupTokens.
     */
    data: CharitySignupTokensCreateManyInput | CharitySignupTokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CharitySignupTokens createManyAndReturn
   */
  export type CharitySignupTokensCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * The data used to create many CharitySignupTokens.
     */
    data: CharitySignupTokensCreateManyInput | CharitySignupTokensCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharitySignupTokens update
   */
  export type CharitySignupTokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * The data needed to update a CharitySignupTokens.
     */
    data: XOR<CharitySignupTokensUpdateInput, CharitySignupTokensUncheckedUpdateInput>
    /**
     * Choose, which CharitySignupTokens to update.
     */
    where: CharitySignupTokensWhereUniqueInput
  }

  /**
   * CharitySignupTokens updateMany
   */
  export type CharitySignupTokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CharitySignupTokens.
     */
    data: XOR<CharitySignupTokensUpdateManyMutationInput, CharitySignupTokensUncheckedUpdateManyInput>
    /**
     * Filter which CharitySignupTokens to update
     */
    where?: CharitySignupTokensWhereInput
    /**
     * Limit how many CharitySignupTokens to update.
     */
    limit?: number
  }

  /**
   * CharitySignupTokens updateManyAndReturn
   */
  export type CharitySignupTokensUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * The data used to update CharitySignupTokens.
     */
    data: XOR<CharitySignupTokensUpdateManyMutationInput, CharitySignupTokensUncheckedUpdateManyInput>
    /**
     * Filter which CharitySignupTokens to update
     */
    where?: CharitySignupTokensWhereInput
    /**
     * Limit how many CharitySignupTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CharitySignupTokens upsert
   */
  export type CharitySignupTokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * The filter to search for the CharitySignupTokens to update in case it exists.
     */
    where: CharitySignupTokensWhereUniqueInput
    /**
     * In case the CharitySignupTokens found by the `where` argument doesn't exist, create a new CharitySignupTokens with this data.
     */
    create: XOR<CharitySignupTokensCreateInput, CharitySignupTokensUncheckedCreateInput>
    /**
     * In case the CharitySignupTokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharitySignupTokensUpdateInput, CharitySignupTokensUncheckedUpdateInput>
  }

  /**
   * CharitySignupTokens delete
   */
  export type CharitySignupTokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
    /**
     * Filter which CharitySignupTokens to delete.
     */
    where: CharitySignupTokensWhereUniqueInput
  }

  /**
   * CharitySignupTokens deleteMany
   */
  export type CharitySignupTokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CharitySignupTokens to delete
     */
    where?: CharitySignupTokensWhereInput
    /**
     * Limit how many CharitySignupTokens to delete.
     */
    limit?: number
  }

  /**
   * CharitySignupTokens.creator
   */
  export type CharitySignupTokens$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * CharitySignupTokens without action
   */
  export type CharitySignupTokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharitySignupTokens
     */
    select?: CharitySignupTokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CharitySignupTokens
     */
    omit?: CharitySignupTokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitySignupTokensInclude<ExtArgs> | null
  }


  /**
   * Model Donations
   */

  export type AggregateDonations = {
    _count: DonationsCountAggregateOutputType | null
    _avg: DonationsAvgAggregateOutputType | null
    _sum: DonationsSumAggregateOutputType | null
    _min: DonationsMinAggregateOutputType | null
    _max: DonationsMaxAggregateOutputType | null
  }

  export type DonationsAvgAggregateOutputType = {
    donation_id: number | null
    donation_request_id: number | null
    created_by: number | null
    accepted_by: number | null
  }

  export type DonationsSumAggregateOutputType = {
    donation_id: number | null
    donation_request_id: number | null
    created_by: number | null
    accepted_by: number | null
  }

  export type DonationsMinAggregateOutputType = {
    donation_id: number | null
    donation_request_id: number | null
    created_by: number | null
    accepted_by: number | null
    accepted_at: Date | null
  }

  export type DonationsMaxAggregateOutputType = {
    donation_id: number | null
    donation_request_id: number | null
    created_by: number | null
    accepted_by: number | null
    accepted_at: Date | null
  }

  export type DonationsCountAggregateOutputType = {
    donation_id: number
    donation_request_id: number
    created_by: number
    accepted_by: number
    accepted_at: number
    _all: number
  }


  export type DonationsAvgAggregateInputType = {
    donation_id?: true
    donation_request_id?: true
    created_by?: true
    accepted_by?: true
  }

  export type DonationsSumAggregateInputType = {
    donation_id?: true
    donation_request_id?: true
    created_by?: true
    accepted_by?: true
  }

  export type DonationsMinAggregateInputType = {
    donation_id?: true
    donation_request_id?: true
    created_by?: true
    accepted_by?: true
    accepted_at?: true
  }

  export type DonationsMaxAggregateInputType = {
    donation_id?: true
    donation_request_id?: true
    created_by?: true
    accepted_by?: true
    accepted_at?: true
  }

  export type DonationsCountAggregateInputType = {
    donation_id?: true
    donation_request_id?: true
    created_by?: true
    accepted_by?: true
    accepted_at?: true
    _all?: true
  }

  export type DonationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donations to aggregate.
     */
    where?: DonationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationsOrderByWithRelationInput | DonationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Donations
    **/
    _count?: true | DonationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DonationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DonationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonationsMaxAggregateInputType
  }

  export type GetDonationsAggregateType<T extends DonationsAggregateArgs> = {
        [P in keyof T & keyof AggregateDonations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonations[P]>
      : GetScalarType<T[P], AggregateDonations[P]>
  }




  export type DonationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationsWhereInput
    orderBy?: DonationsOrderByWithAggregationInput | DonationsOrderByWithAggregationInput[]
    by: DonationsScalarFieldEnum[] | DonationsScalarFieldEnum
    having?: DonationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonationsCountAggregateInputType | true
    _avg?: DonationsAvgAggregateInputType
    _sum?: DonationsSumAggregateInputType
    _min?: DonationsMinAggregateInputType
    _max?: DonationsMaxAggregateInputType
  }

  export type DonationsGroupByOutputType = {
    donation_id: number
    donation_request_id: number
    created_by: number
    accepted_by: number
    accepted_at: Date
    _count: DonationsCountAggregateOutputType | null
    _avg: DonationsAvgAggregateOutputType | null
    _sum: DonationsSumAggregateOutputType | null
    _min: DonationsMinAggregateOutputType | null
    _max: DonationsMaxAggregateOutputType | null
  }

  type GetDonationsGroupByPayload<T extends DonationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonationsGroupByOutputType[P]>
            : GetScalarType<T[P], DonationsGroupByOutputType[P]>
        }
      >
    >


  export type DonationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    donation_id?: boolean
    donation_request_id?: boolean
    created_by?: boolean
    accepted_by?: boolean
    accepted_at?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    accepted?: boolean | CharitiesDefaultArgs<ExtArgs>
    request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    ClothingItems?: boolean | Donations$ClothingItemsArgs<ExtArgs>
    _count?: boolean | DonationsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donations"]>

  export type DonationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    donation_id?: boolean
    donation_request_id?: boolean
    created_by?: boolean
    accepted_by?: boolean
    accepted_at?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    accepted?: boolean | CharitiesDefaultArgs<ExtArgs>
    request?: boolean | DonationRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donations"]>

  export type DonationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    donation_id?: boolean
    donation_request_id?: boolean
    created_by?: boolean
    accepted_by?: boolean
    accepted_at?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    accepted?: boolean | CharitiesDefaultArgs<ExtArgs>
    request?: boolean | DonationRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donations"]>

  export type DonationsSelectScalar = {
    donation_id?: boolean
    donation_request_id?: boolean
    created_by?: boolean
    accepted_by?: boolean
    accepted_at?: boolean
  }

  export type DonationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"donation_id" | "donation_request_id" | "created_by" | "accepted_by" | "accepted_at", ExtArgs["result"]["donations"]>
  export type DonationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    accepted?: boolean | CharitiesDefaultArgs<ExtArgs>
    request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    ClothingItems?: boolean | Donations$ClothingItemsArgs<ExtArgs>
    _count?: boolean | DonationsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DonationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    accepted?: boolean | CharitiesDefaultArgs<ExtArgs>
    request?: boolean | DonationRequestDefaultArgs<ExtArgs>
  }
  export type DonationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    accepted?: boolean | CharitiesDefaultArgs<ExtArgs>
    request?: boolean | DonationRequestDefaultArgs<ExtArgs>
  }

  export type $DonationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Donations"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      accepted: Prisma.$CharitiesPayload<ExtArgs>
      request: Prisma.$DonationRequestPayload<ExtArgs>
      ClothingItems: Prisma.$ClothingItemsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      donation_id: number
      donation_request_id: number
      created_by: number
      accepted_by: number
      accepted_at: Date
    }, ExtArgs["result"]["donations"]>
    composites: {}
  }

  type DonationsGetPayload<S extends boolean | null | undefined | DonationsDefaultArgs> = $Result.GetResult<Prisma.$DonationsPayload, S>

  type DonationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonationsCountAggregateInputType | true
    }

  export interface DonationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Donations'], meta: { name: 'Donations' } }
    /**
     * Find zero or one Donations that matches the filter.
     * @param {DonationsFindUniqueArgs} args - Arguments to find a Donations
     * @example
     * // Get one Donations
     * const donations = await prisma.donations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonationsFindUniqueArgs>(args: SelectSubset<T, DonationsFindUniqueArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Donations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonationsFindUniqueOrThrowArgs} args - Arguments to find a Donations
     * @example
     * // Get one Donations
     * const donations = await prisma.donations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonationsFindUniqueOrThrowArgs>(args: SelectSubset<T, DonationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsFindFirstArgs} args - Arguments to find a Donations
     * @example
     * // Get one Donations
     * const donations = await prisma.donations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonationsFindFirstArgs>(args?: SelectSubset<T, DonationsFindFirstArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsFindFirstOrThrowArgs} args - Arguments to find a Donations
     * @example
     * // Get one Donations
     * const donations = await prisma.donations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonationsFindFirstOrThrowArgs>(args?: SelectSubset<T, DonationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Donations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Donations
     * const donations = await prisma.donations.findMany()
     * 
     * // Get first 10 Donations
     * const donations = await prisma.donations.findMany({ take: 10 })
     * 
     * // Only select the `donation_id`
     * const donationsWithDonation_idOnly = await prisma.donations.findMany({ select: { donation_id: true } })
     * 
     */
    findMany<T extends DonationsFindManyArgs>(args?: SelectSubset<T, DonationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Donations.
     * @param {DonationsCreateArgs} args - Arguments to create a Donations.
     * @example
     * // Create one Donations
     * const Donations = await prisma.donations.create({
     *   data: {
     *     // ... data to create a Donations
     *   }
     * })
     * 
     */
    create<T extends DonationsCreateArgs>(args: SelectSubset<T, DonationsCreateArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Donations.
     * @param {DonationsCreateManyArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donations = await prisma.donations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonationsCreateManyArgs>(args?: SelectSubset<T, DonationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Donations and returns the data saved in the database.
     * @param {DonationsCreateManyAndReturnArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donations = await prisma.donations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Donations and only return the `donation_id`
     * const donationsWithDonation_idOnly = await prisma.donations.createManyAndReturn({
     *   select: { donation_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonationsCreateManyAndReturnArgs>(args?: SelectSubset<T, DonationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Donations.
     * @param {DonationsDeleteArgs} args - Arguments to delete one Donations.
     * @example
     * // Delete one Donations
     * const Donations = await prisma.donations.delete({
     *   where: {
     *     // ... filter to delete one Donations
     *   }
     * })
     * 
     */
    delete<T extends DonationsDeleteArgs>(args: SelectSubset<T, DonationsDeleteArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Donations.
     * @param {DonationsUpdateArgs} args - Arguments to update one Donations.
     * @example
     * // Update one Donations
     * const donations = await prisma.donations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonationsUpdateArgs>(args: SelectSubset<T, DonationsUpdateArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Donations.
     * @param {DonationsDeleteManyArgs} args - Arguments to filter Donations to delete.
     * @example
     * // Delete a few Donations
     * const { count } = await prisma.donations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonationsDeleteManyArgs>(args?: SelectSubset<T, DonationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Donations
     * const donations = await prisma.donations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonationsUpdateManyArgs>(args: SelectSubset<T, DonationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations and returns the data updated in the database.
     * @param {DonationsUpdateManyAndReturnArgs} args - Arguments to update many Donations.
     * @example
     * // Update many Donations
     * const donations = await prisma.donations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Donations and only return the `donation_id`
     * const donationsWithDonation_idOnly = await prisma.donations.updateManyAndReturn({
     *   select: { donation_id: true },
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
    updateManyAndReturn<T extends DonationsUpdateManyAndReturnArgs>(args: SelectSubset<T, DonationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Donations.
     * @param {DonationsUpsertArgs} args - Arguments to update or create a Donations.
     * @example
     * // Update or create a Donations
     * const donations = await prisma.donations.upsert({
     *   create: {
     *     // ... data to create a Donations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Donations we want to update
     *   }
     * })
     */
    upsert<T extends DonationsUpsertArgs>(args: SelectSubset<T, DonationsUpsertArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsCountArgs} args - Arguments to filter Donations to count.
     * @example
     * // Count the number of Donations
     * const count = await prisma.donations.count({
     *   where: {
     *     // ... the filter for the Donations we want to count
     *   }
     * })
    **/
    count<T extends DonationsCountArgs>(
      args?: Subset<T, DonationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DonationsAggregateArgs>(args: Subset<T, DonationsAggregateArgs>): Prisma.PrismaPromise<GetDonationsAggregateType<T>>

    /**
     * Group by Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationsGroupByArgs} args - Group by arguments.
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
      T extends DonationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonationsGroupByArgs['orderBy'] }
        : { orderBy?: DonationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DonationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Donations model
   */
  readonly fields: DonationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Donations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accepted<T extends CharitiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CharitiesDefaultArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    request<T extends DonationRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DonationRequestDefaultArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ClothingItems<T extends Donations$ClothingItemsArgs<ExtArgs> = {}>(args?: Subset<T, Donations$ClothingItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Donations model
   */
  interface DonationsFieldRefs {
    readonly donation_id: FieldRef<"Donations", 'Int'>
    readonly donation_request_id: FieldRef<"Donations", 'Int'>
    readonly created_by: FieldRef<"Donations", 'Int'>
    readonly accepted_by: FieldRef<"Donations", 'Int'>
    readonly accepted_at: FieldRef<"Donations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Donations findUnique
   */
  export type DonationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where: DonationsWhereUniqueInput
  }

  /**
   * Donations findUniqueOrThrow
   */
  export type DonationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where: DonationsWhereUniqueInput
  }

  /**
   * Donations findFirst
   */
  export type DonationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where?: DonationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationsOrderByWithRelationInput | DonationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationsScalarFieldEnum | DonationsScalarFieldEnum[]
  }

  /**
   * Donations findFirstOrThrow
   */
  export type DonationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where?: DonationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationsOrderByWithRelationInput | DonationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationsScalarFieldEnum | DonationsScalarFieldEnum[]
  }

  /**
   * Donations findMany
   */
  export type DonationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where?: DonationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationsOrderByWithRelationInput | DonationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Donations.
     */
    cursor?: DonationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    distinct?: DonationsScalarFieldEnum | DonationsScalarFieldEnum[]
  }

  /**
   * Donations create
   */
  export type DonationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * The data needed to create a Donations.
     */
    data: XOR<DonationsCreateInput, DonationsUncheckedCreateInput>
  }

  /**
   * Donations createMany
   */
  export type DonationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Donations.
     */
    data: DonationsCreateManyInput | DonationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Donations createManyAndReturn
   */
  export type DonationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * The data used to create many Donations.
     */
    data: DonationsCreateManyInput | DonationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Donations update
   */
  export type DonationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * The data needed to update a Donations.
     */
    data: XOR<DonationsUpdateInput, DonationsUncheckedUpdateInput>
    /**
     * Choose, which Donations to update.
     */
    where: DonationsWhereUniqueInput
  }

  /**
   * Donations updateMany
   */
  export type DonationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationsUpdateManyMutationInput, DonationsUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationsWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
  }

  /**
   * Donations updateManyAndReturn
   */
  export type DonationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationsUpdateManyMutationInput, DonationsUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationsWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Donations upsert
   */
  export type DonationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * The filter to search for the Donations to update in case it exists.
     */
    where: DonationsWhereUniqueInput
    /**
     * In case the Donations found by the `where` argument doesn't exist, create a new Donations with this data.
     */
    create: XOR<DonationsCreateInput, DonationsUncheckedCreateInput>
    /**
     * In case the Donations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonationsUpdateInput, DonationsUncheckedUpdateInput>
  }

  /**
   * Donations delete
   */
  export type DonationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    /**
     * Filter which Donations to delete.
     */
    where: DonationsWhereUniqueInput
  }

  /**
   * Donations deleteMany
   */
  export type DonationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donations to delete
     */
    where?: DonationsWhereInput
    /**
     * Limit how many Donations to delete.
     */
    limit?: number
  }

  /**
   * Donations.ClothingItems
   */
  export type Donations$ClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    where?: ClothingItemsWhereInput
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    cursor?: ClothingItemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
  }

  /**
   * Donations without action
   */
  export type DonationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
  }


  /**
   * Model DonationRequest
   */

  export type AggregateDonationRequest = {
    _count: DonationRequestCountAggregateOutputType | null
    _avg: DonationRequestAvgAggregateOutputType | null
    _sum: DonationRequestSumAggregateOutputType | null
    _min: DonationRequestMinAggregateOutputType | null
    _max: DonationRequestMaxAggregateOutputType | null
  }

  export type DonationRequestAvgAggregateOutputType = {
    donation_request_id: number | null
    answered_by: number | null
    created_by: number | null
  }

  export type DonationRequestSumAggregateOutputType = {
    donation_request_id: number | null
    answered_by: number | null
    created_by: number | null
  }

  export type DonationRequestMinAggregateOutputType = {
    donation_request_id: number | null
    title: string | null
    created_on: Date | null
    updated_on: Date | null
    status: $Enums.Status | null
    answered_by: number | null
    created_by: number | null
  }

  export type DonationRequestMaxAggregateOutputType = {
    donation_request_id: number | null
    title: string | null
    created_on: Date | null
    updated_on: Date | null
    status: $Enums.Status | null
    answered_by: number | null
    created_by: number | null
  }

  export type DonationRequestCountAggregateOutputType = {
    donation_request_id: number
    title: number
    created_on: number
    updated_on: number
    status: number
    answered_by: number
    created_by: number
    _all: number
  }


  export type DonationRequestAvgAggregateInputType = {
    donation_request_id?: true
    answered_by?: true
    created_by?: true
  }

  export type DonationRequestSumAggregateInputType = {
    donation_request_id?: true
    answered_by?: true
    created_by?: true
  }

  export type DonationRequestMinAggregateInputType = {
    donation_request_id?: true
    title?: true
    created_on?: true
    updated_on?: true
    status?: true
    answered_by?: true
    created_by?: true
  }

  export type DonationRequestMaxAggregateInputType = {
    donation_request_id?: true
    title?: true
    created_on?: true
    updated_on?: true
    status?: true
    answered_by?: true
    created_by?: true
  }

  export type DonationRequestCountAggregateInputType = {
    donation_request_id?: true
    title?: true
    created_on?: true
    updated_on?: true
    status?: true
    answered_by?: true
    created_by?: true
    _all?: true
  }

  export type DonationRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DonationRequest to aggregate.
     */
    where?: DonationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonationRequests to fetch.
     */
    orderBy?: DonationRequestOrderByWithRelationInput | DonationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DonationRequests
    **/
    _count?: true | DonationRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DonationRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DonationRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonationRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonationRequestMaxAggregateInputType
  }

  export type GetDonationRequestAggregateType<T extends DonationRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateDonationRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonationRequest[P]>
      : GetScalarType<T[P], AggregateDonationRequest[P]>
  }




  export type DonationRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationRequestWhereInput
    orderBy?: DonationRequestOrderByWithAggregationInput | DonationRequestOrderByWithAggregationInput[]
    by: DonationRequestScalarFieldEnum[] | DonationRequestScalarFieldEnum
    having?: DonationRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonationRequestCountAggregateInputType | true
    _avg?: DonationRequestAvgAggregateInputType
    _sum?: DonationRequestSumAggregateInputType
    _min?: DonationRequestMinAggregateInputType
    _max?: DonationRequestMaxAggregateInputType
  }

  export type DonationRequestGroupByOutputType = {
    donation_request_id: number
    title: string
    created_on: Date
    updated_on: Date
    status: $Enums.Status
    answered_by: number | null
    created_by: number
    _count: DonationRequestCountAggregateOutputType | null
    _avg: DonationRequestAvgAggregateOutputType | null
    _sum: DonationRequestSumAggregateOutputType | null
    _min: DonationRequestMinAggregateOutputType | null
    _max: DonationRequestMaxAggregateOutputType | null
  }

  type GetDonationRequestGroupByPayload<T extends DonationRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonationRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonationRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonationRequestGroupByOutputType[P]>
            : GetScalarType<T[P], DonationRequestGroupByOutputType[P]>
        }
      >
    >


  export type DonationRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    donation_request_id?: boolean
    title?: boolean
    created_on?: boolean
    updated_on?: boolean
    status?: boolean
    answered_by?: boolean
    created_by?: boolean
    accepted_donation?: boolean | DonationRequest$accepted_donationArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    answering_charity?: boolean | DonationRequest$answering_charityArgs<ExtArgs>
    ClothingItems?: boolean | DonationRequest$ClothingItemsArgs<ExtArgs>
    _count?: boolean | DonationRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donationRequest"]>

  export type DonationRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    donation_request_id?: boolean
    title?: boolean
    created_on?: boolean
    updated_on?: boolean
    status?: boolean
    answered_by?: boolean
    created_by?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    answering_charity?: boolean | DonationRequest$answering_charityArgs<ExtArgs>
  }, ExtArgs["result"]["donationRequest"]>

  export type DonationRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    donation_request_id?: boolean
    title?: boolean
    created_on?: boolean
    updated_on?: boolean
    status?: boolean
    answered_by?: boolean
    created_by?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    answering_charity?: boolean | DonationRequest$answering_charityArgs<ExtArgs>
  }, ExtArgs["result"]["donationRequest"]>

  export type DonationRequestSelectScalar = {
    donation_request_id?: boolean
    title?: boolean
    created_on?: boolean
    updated_on?: boolean
    status?: boolean
    answered_by?: boolean
    created_by?: boolean
  }

  export type DonationRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"donation_request_id" | "title" | "created_on" | "updated_on" | "status" | "answered_by" | "created_by", ExtArgs["result"]["donationRequest"]>
  export type DonationRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accepted_donation?: boolean | DonationRequest$accepted_donationArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    answering_charity?: boolean | DonationRequest$answering_charityArgs<ExtArgs>
    ClothingItems?: boolean | DonationRequest$ClothingItemsArgs<ExtArgs>
    _count?: boolean | DonationRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DonationRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    answering_charity?: boolean | DonationRequest$answering_charityArgs<ExtArgs>
  }
  export type DonationRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    answering_charity?: boolean | DonationRequest$answering_charityArgs<ExtArgs>
  }

  export type $DonationRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DonationRequest"
    objects: {
      accepted_donation: Prisma.$DonationsPayload<ExtArgs> | null
      creator: Prisma.$UserPayload<ExtArgs>
      answering_charity: Prisma.$CharitiesPayload<ExtArgs> | null
      ClothingItems: Prisma.$ClothingItemsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      donation_request_id: number
      title: string
      created_on: Date
      updated_on: Date
      status: $Enums.Status
      answered_by: number | null
      created_by: number
    }, ExtArgs["result"]["donationRequest"]>
    composites: {}
  }

  type DonationRequestGetPayload<S extends boolean | null | undefined | DonationRequestDefaultArgs> = $Result.GetResult<Prisma.$DonationRequestPayload, S>

  type DonationRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonationRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonationRequestCountAggregateInputType | true
    }

  export interface DonationRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DonationRequest'], meta: { name: 'DonationRequest' } }
    /**
     * Find zero or one DonationRequest that matches the filter.
     * @param {DonationRequestFindUniqueArgs} args - Arguments to find a DonationRequest
     * @example
     * // Get one DonationRequest
     * const donationRequest = await prisma.donationRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonationRequestFindUniqueArgs>(args: SelectSubset<T, DonationRequestFindUniqueArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DonationRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonationRequestFindUniqueOrThrowArgs} args - Arguments to find a DonationRequest
     * @example
     * // Get one DonationRequest
     * const donationRequest = await prisma.donationRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonationRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, DonationRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DonationRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestFindFirstArgs} args - Arguments to find a DonationRequest
     * @example
     * // Get one DonationRequest
     * const donationRequest = await prisma.donationRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonationRequestFindFirstArgs>(args?: SelectSubset<T, DonationRequestFindFirstArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DonationRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestFindFirstOrThrowArgs} args - Arguments to find a DonationRequest
     * @example
     * // Get one DonationRequest
     * const donationRequest = await prisma.donationRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonationRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, DonationRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DonationRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DonationRequests
     * const donationRequests = await prisma.donationRequest.findMany()
     * 
     * // Get first 10 DonationRequests
     * const donationRequests = await prisma.donationRequest.findMany({ take: 10 })
     * 
     * // Only select the `donation_request_id`
     * const donationRequestWithDonation_request_idOnly = await prisma.donationRequest.findMany({ select: { donation_request_id: true } })
     * 
     */
    findMany<T extends DonationRequestFindManyArgs>(args?: SelectSubset<T, DonationRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DonationRequest.
     * @param {DonationRequestCreateArgs} args - Arguments to create a DonationRequest.
     * @example
     * // Create one DonationRequest
     * const DonationRequest = await prisma.donationRequest.create({
     *   data: {
     *     // ... data to create a DonationRequest
     *   }
     * })
     * 
     */
    create<T extends DonationRequestCreateArgs>(args: SelectSubset<T, DonationRequestCreateArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DonationRequests.
     * @param {DonationRequestCreateManyArgs} args - Arguments to create many DonationRequests.
     * @example
     * // Create many DonationRequests
     * const donationRequest = await prisma.donationRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonationRequestCreateManyArgs>(args?: SelectSubset<T, DonationRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DonationRequests and returns the data saved in the database.
     * @param {DonationRequestCreateManyAndReturnArgs} args - Arguments to create many DonationRequests.
     * @example
     * // Create many DonationRequests
     * const donationRequest = await prisma.donationRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DonationRequests and only return the `donation_request_id`
     * const donationRequestWithDonation_request_idOnly = await prisma.donationRequest.createManyAndReturn({
     *   select: { donation_request_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonationRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, DonationRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DonationRequest.
     * @param {DonationRequestDeleteArgs} args - Arguments to delete one DonationRequest.
     * @example
     * // Delete one DonationRequest
     * const DonationRequest = await prisma.donationRequest.delete({
     *   where: {
     *     // ... filter to delete one DonationRequest
     *   }
     * })
     * 
     */
    delete<T extends DonationRequestDeleteArgs>(args: SelectSubset<T, DonationRequestDeleteArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DonationRequest.
     * @param {DonationRequestUpdateArgs} args - Arguments to update one DonationRequest.
     * @example
     * // Update one DonationRequest
     * const donationRequest = await prisma.donationRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonationRequestUpdateArgs>(args: SelectSubset<T, DonationRequestUpdateArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DonationRequests.
     * @param {DonationRequestDeleteManyArgs} args - Arguments to filter DonationRequests to delete.
     * @example
     * // Delete a few DonationRequests
     * const { count } = await prisma.donationRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonationRequestDeleteManyArgs>(args?: SelectSubset<T, DonationRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DonationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DonationRequests
     * const donationRequest = await prisma.donationRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonationRequestUpdateManyArgs>(args: SelectSubset<T, DonationRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DonationRequests and returns the data updated in the database.
     * @param {DonationRequestUpdateManyAndReturnArgs} args - Arguments to update many DonationRequests.
     * @example
     * // Update many DonationRequests
     * const donationRequest = await prisma.donationRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DonationRequests and only return the `donation_request_id`
     * const donationRequestWithDonation_request_idOnly = await prisma.donationRequest.updateManyAndReturn({
     *   select: { donation_request_id: true },
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
    updateManyAndReturn<T extends DonationRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, DonationRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DonationRequest.
     * @param {DonationRequestUpsertArgs} args - Arguments to update or create a DonationRequest.
     * @example
     * // Update or create a DonationRequest
     * const donationRequest = await prisma.donationRequest.upsert({
     *   create: {
     *     // ... data to create a DonationRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DonationRequest we want to update
     *   }
     * })
     */
    upsert<T extends DonationRequestUpsertArgs>(args: SelectSubset<T, DonationRequestUpsertArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DonationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestCountArgs} args - Arguments to filter DonationRequests to count.
     * @example
     * // Count the number of DonationRequests
     * const count = await prisma.donationRequest.count({
     *   where: {
     *     // ... the filter for the DonationRequests we want to count
     *   }
     * })
    **/
    count<T extends DonationRequestCountArgs>(
      args?: Subset<T, DonationRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonationRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DonationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DonationRequestAggregateArgs>(args: Subset<T, DonationRequestAggregateArgs>): Prisma.PrismaPromise<GetDonationRequestAggregateType<T>>

    /**
     * Group by DonationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationRequestGroupByArgs} args - Group by arguments.
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
      T extends DonationRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonationRequestGroupByArgs['orderBy'] }
        : { orderBy?: DonationRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DonationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonationRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DonationRequest model
   */
  readonly fields: DonationRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DonationRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonationRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accepted_donation<T extends DonationRequest$accepted_donationArgs<ExtArgs> = {}>(args?: Subset<T, DonationRequest$accepted_donationArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    answering_charity<T extends DonationRequest$answering_charityArgs<ExtArgs> = {}>(args?: Subset<T, DonationRequest$answering_charityArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ClothingItems<T extends DonationRequest$ClothingItemsArgs<ExtArgs> = {}>(args?: Subset<T, DonationRequest$ClothingItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DonationRequest model
   */
  interface DonationRequestFieldRefs {
    readonly donation_request_id: FieldRef<"DonationRequest", 'Int'>
    readonly title: FieldRef<"DonationRequest", 'String'>
    readonly created_on: FieldRef<"DonationRequest", 'DateTime'>
    readonly updated_on: FieldRef<"DonationRequest", 'DateTime'>
    readonly status: FieldRef<"DonationRequest", 'Status'>
    readonly answered_by: FieldRef<"DonationRequest", 'Int'>
    readonly created_by: FieldRef<"DonationRequest", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DonationRequest findUnique
   */
  export type DonationRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * Filter, which DonationRequest to fetch.
     */
    where: DonationRequestWhereUniqueInput
  }

  /**
   * DonationRequest findUniqueOrThrow
   */
  export type DonationRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * Filter, which DonationRequest to fetch.
     */
    where: DonationRequestWhereUniqueInput
  }

  /**
   * DonationRequest findFirst
   */
  export type DonationRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * Filter, which DonationRequest to fetch.
     */
    where?: DonationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonationRequests to fetch.
     */
    orderBy?: DonationRequestOrderByWithRelationInput | DonationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DonationRequests.
     */
    cursor?: DonationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DonationRequests.
     */
    distinct?: DonationRequestScalarFieldEnum | DonationRequestScalarFieldEnum[]
  }

  /**
   * DonationRequest findFirstOrThrow
   */
  export type DonationRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * Filter, which DonationRequest to fetch.
     */
    where?: DonationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonationRequests to fetch.
     */
    orderBy?: DonationRequestOrderByWithRelationInput | DonationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DonationRequests.
     */
    cursor?: DonationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DonationRequests.
     */
    distinct?: DonationRequestScalarFieldEnum | DonationRequestScalarFieldEnum[]
  }

  /**
   * DonationRequest findMany
   */
  export type DonationRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * Filter, which DonationRequests to fetch.
     */
    where?: DonationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DonationRequests to fetch.
     */
    orderBy?: DonationRequestOrderByWithRelationInput | DonationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DonationRequests.
     */
    cursor?: DonationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DonationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DonationRequests.
     */
    skip?: number
    distinct?: DonationRequestScalarFieldEnum | DonationRequestScalarFieldEnum[]
  }

  /**
   * DonationRequest create
   */
  export type DonationRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a DonationRequest.
     */
    data: XOR<DonationRequestCreateInput, DonationRequestUncheckedCreateInput>
  }

  /**
   * DonationRequest createMany
   */
  export type DonationRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DonationRequests.
     */
    data: DonationRequestCreateManyInput | DonationRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DonationRequest createManyAndReturn
   */
  export type DonationRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * The data used to create many DonationRequests.
     */
    data: DonationRequestCreateManyInput | DonationRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DonationRequest update
   */
  export type DonationRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a DonationRequest.
     */
    data: XOR<DonationRequestUpdateInput, DonationRequestUncheckedUpdateInput>
    /**
     * Choose, which DonationRequest to update.
     */
    where: DonationRequestWhereUniqueInput
  }

  /**
   * DonationRequest updateMany
   */
  export type DonationRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DonationRequests.
     */
    data: XOR<DonationRequestUpdateManyMutationInput, DonationRequestUncheckedUpdateManyInput>
    /**
     * Filter which DonationRequests to update
     */
    where?: DonationRequestWhereInput
    /**
     * Limit how many DonationRequests to update.
     */
    limit?: number
  }

  /**
   * DonationRequest updateManyAndReturn
   */
  export type DonationRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * The data used to update DonationRequests.
     */
    data: XOR<DonationRequestUpdateManyMutationInput, DonationRequestUncheckedUpdateManyInput>
    /**
     * Filter which DonationRequests to update
     */
    where?: DonationRequestWhereInput
    /**
     * Limit how many DonationRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DonationRequest upsert
   */
  export type DonationRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the DonationRequest to update in case it exists.
     */
    where: DonationRequestWhereUniqueInput
    /**
     * In case the DonationRequest found by the `where` argument doesn't exist, create a new DonationRequest with this data.
     */
    create: XOR<DonationRequestCreateInput, DonationRequestUncheckedCreateInput>
    /**
     * In case the DonationRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonationRequestUpdateInput, DonationRequestUncheckedUpdateInput>
  }

  /**
   * DonationRequest delete
   */
  export type DonationRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
    /**
     * Filter which DonationRequest to delete.
     */
    where: DonationRequestWhereUniqueInput
  }

  /**
   * DonationRequest deleteMany
   */
  export type DonationRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DonationRequests to delete
     */
    where?: DonationRequestWhereInput
    /**
     * Limit how many DonationRequests to delete.
     */
    limit?: number
  }

  /**
   * DonationRequest.accepted_donation
   */
  export type DonationRequest$accepted_donationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    where?: DonationsWhereInput
  }

  /**
   * DonationRequest.answering_charity
   */
  export type DonationRequest$answering_charityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    where?: CharitiesWhereInput
  }

  /**
   * DonationRequest.ClothingItems
   */
  export type DonationRequest$ClothingItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    where?: ClothingItemsWhereInput
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    cursor?: ClothingItemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
  }

  /**
   * DonationRequest without action
   */
  export type DonationRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationRequest
     */
    select?: DonationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DonationRequest
     */
    omit?: DonationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationRequestInclude<ExtArgs> | null
  }


  /**
   * Model ClothingItems
   */

  export type AggregateClothingItems = {
    _count: ClothingItemsCountAggregateOutputType | null
    _avg: ClothingItemsAvgAggregateOutputType | null
    _sum: ClothingItemsSumAggregateOutputType | null
    _min: ClothingItemsMinAggregateOutputType | null
    _max: ClothingItemsMaxAggregateOutputType | null
  }

  export type ClothingItemsAvgAggregateOutputType = {
    clothing_id: number | null
    donation_request_id: number | null
    donor_id: number | null
    donation_id: number | null
    owned_by: number | null
  }

  export type ClothingItemsSumAggregateOutputType = {
    clothing_id: number | null
    donation_request_id: number | null
    donor_id: number | null
    donation_id: number | null
    owned_by: number | null
  }

  export type ClothingItemsMinAggregateOutputType = {
    clothing_id: number | null
    donation_request_id: number | null
    type: string | null
    size: string | null
    condition: string | null
    donor_id: number | null
    donation_id: number | null
    owned_by: number | null
    front_image_url: string | null
    back_image_url: string | null
  }

  export type ClothingItemsMaxAggregateOutputType = {
    clothing_id: number | null
    donation_request_id: number | null
    type: string | null
    size: string | null
    condition: string | null
    donor_id: number | null
    donation_id: number | null
    owned_by: number | null
    front_image_url: string | null
    back_image_url: string | null
  }

  export type ClothingItemsCountAggregateOutputType = {
    clothing_id: number
    donation_request_id: number
    type: number
    size: number
    condition: number
    donor_id: number
    donation_id: number
    owned_by: number
    front_image_url: number
    back_image_url: number
    _all: number
  }


  export type ClothingItemsAvgAggregateInputType = {
    clothing_id?: true
    donation_request_id?: true
    donor_id?: true
    donation_id?: true
    owned_by?: true
  }

  export type ClothingItemsSumAggregateInputType = {
    clothing_id?: true
    donation_request_id?: true
    donor_id?: true
    donation_id?: true
    owned_by?: true
  }

  export type ClothingItemsMinAggregateInputType = {
    clothing_id?: true
    donation_request_id?: true
    type?: true
    size?: true
    condition?: true
    donor_id?: true
    donation_id?: true
    owned_by?: true
    front_image_url?: true
    back_image_url?: true
  }

  export type ClothingItemsMaxAggregateInputType = {
    clothing_id?: true
    donation_request_id?: true
    type?: true
    size?: true
    condition?: true
    donor_id?: true
    donation_id?: true
    owned_by?: true
    front_image_url?: true
    back_image_url?: true
  }

  export type ClothingItemsCountAggregateInputType = {
    clothing_id?: true
    donation_request_id?: true
    type?: true
    size?: true
    condition?: true
    donor_id?: true
    donation_id?: true
    owned_by?: true
    front_image_url?: true
    back_image_url?: true
    _all?: true
  }

  export type ClothingItemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClothingItems to aggregate.
     */
    where?: ClothingItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClothingItems to fetch.
     */
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClothingItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClothingItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClothingItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClothingItems
    **/
    _count?: true | ClothingItemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClothingItemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClothingItemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClothingItemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClothingItemsMaxAggregateInputType
  }

  export type GetClothingItemsAggregateType<T extends ClothingItemsAggregateArgs> = {
        [P in keyof T & keyof AggregateClothingItems]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClothingItems[P]>
      : GetScalarType<T[P], AggregateClothingItems[P]>
  }




  export type ClothingItemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClothingItemsWhereInput
    orderBy?: ClothingItemsOrderByWithAggregationInput | ClothingItemsOrderByWithAggregationInput[]
    by: ClothingItemsScalarFieldEnum[] | ClothingItemsScalarFieldEnum
    having?: ClothingItemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClothingItemsCountAggregateInputType | true
    _avg?: ClothingItemsAvgAggregateInputType
    _sum?: ClothingItemsSumAggregateInputType
    _min?: ClothingItemsMinAggregateInputType
    _max?: ClothingItemsMaxAggregateInputType
  }

  export type ClothingItemsGroupByOutputType = {
    clothing_id: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id: number | null
    owned_by: number | null
    front_image_url: string
    back_image_url: string
    _count: ClothingItemsCountAggregateOutputType | null
    _avg: ClothingItemsAvgAggregateOutputType | null
    _sum: ClothingItemsSumAggregateOutputType | null
    _min: ClothingItemsMinAggregateOutputType | null
    _max: ClothingItemsMaxAggregateOutputType | null
  }

  type GetClothingItemsGroupByPayload<T extends ClothingItemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClothingItemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClothingItemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClothingItemsGroupByOutputType[P]>
            : GetScalarType<T[P], ClothingItemsGroupByOutputType[P]>
        }
      >
    >


  export type ClothingItemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clothing_id?: boolean
    donation_request_id?: boolean
    type?: boolean
    size?: boolean
    condition?: boolean
    donor_id?: boolean
    donation_id?: boolean
    owned_by?: boolean
    front_image_url?: boolean
    back_image_url?: boolean
    donation_request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    donor?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | ClothingItems$ownerArgs<ExtArgs>
    donation?: boolean | ClothingItems$donationArgs<ExtArgs>
  }, ExtArgs["result"]["clothingItems"]>

  export type ClothingItemsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clothing_id?: boolean
    donation_request_id?: boolean
    type?: boolean
    size?: boolean
    condition?: boolean
    donor_id?: boolean
    donation_id?: boolean
    owned_by?: boolean
    front_image_url?: boolean
    back_image_url?: boolean
    donation_request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    donor?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | ClothingItems$ownerArgs<ExtArgs>
    donation?: boolean | ClothingItems$donationArgs<ExtArgs>
  }, ExtArgs["result"]["clothingItems"]>

  export type ClothingItemsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clothing_id?: boolean
    donation_request_id?: boolean
    type?: boolean
    size?: boolean
    condition?: boolean
    donor_id?: boolean
    donation_id?: boolean
    owned_by?: boolean
    front_image_url?: boolean
    back_image_url?: boolean
    donation_request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    donor?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | ClothingItems$ownerArgs<ExtArgs>
    donation?: boolean | ClothingItems$donationArgs<ExtArgs>
  }, ExtArgs["result"]["clothingItems"]>

  export type ClothingItemsSelectScalar = {
    clothing_id?: boolean
    donation_request_id?: boolean
    type?: boolean
    size?: boolean
    condition?: boolean
    donor_id?: boolean
    donation_id?: boolean
    owned_by?: boolean
    front_image_url?: boolean
    back_image_url?: boolean
  }

  export type ClothingItemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"clothing_id" | "donation_request_id" | "type" | "size" | "condition" | "donor_id" | "donation_id" | "owned_by" | "front_image_url" | "back_image_url", ExtArgs["result"]["clothingItems"]>
  export type ClothingItemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donation_request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    donor?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | ClothingItems$ownerArgs<ExtArgs>
    donation?: boolean | ClothingItems$donationArgs<ExtArgs>
  }
  export type ClothingItemsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donation_request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    donor?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | ClothingItems$ownerArgs<ExtArgs>
    donation?: boolean | ClothingItems$donationArgs<ExtArgs>
  }
  export type ClothingItemsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donation_request?: boolean | DonationRequestDefaultArgs<ExtArgs>
    donor?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | ClothingItems$ownerArgs<ExtArgs>
    donation?: boolean | ClothingItems$donationArgs<ExtArgs>
  }

  export type $ClothingItemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClothingItems"
    objects: {
      donation_request: Prisma.$DonationRequestPayload<ExtArgs>
      donor: Prisma.$UserPayload<ExtArgs>
      owner: Prisma.$CharitiesPayload<ExtArgs> | null
      donation: Prisma.$DonationsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      clothing_id: number
      donation_request_id: number
      type: string
      size: string
      condition: string
      donor_id: number
      donation_id: number | null
      owned_by: number | null
      front_image_url: string
      back_image_url: string
    }, ExtArgs["result"]["clothingItems"]>
    composites: {}
  }

  type ClothingItemsGetPayload<S extends boolean | null | undefined | ClothingItemsDefaultArgs> = $Result.GetResult<Prisma.$ClothingItemsPayload, S>

  type ClothingItemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClothingItemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClothingItemsCountAggregateInputType | true
    }

  export interface ClothingItemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClothingItems'], meta: { name: 'ClothingItems' } }
    /**
     * Find zero or one ClothingItems that matches the filter.
     * @param {ClothingItemsFindUniqueArgs} args - Arguments to find a ClothingItems
     * @example
     * // Get one ClothingItems
     * const clothingItems = await prisma.clothingItems.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClothingItemsFindUniqueArgs>(args: SelectSubset<T, ClothingItemsFindUniqueArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClothingItems that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClothingItemsFindUniqueOrThrowArgs} args - Arguments to find a ClothingItems
     * @example
     * // Get one ClothingItems
     * const clothingItems = await prisma.clothingItems.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClothingItemsFindUniqueOrThrowArgs>(args: SelectSubset<T, ClothingItemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClothingItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsFindFirstArgs} args - Arguments to find a ClothingItems
     * @example
     * // Get one ClothingItems
     * const clothingItems = await prisma.clothingItems.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClothingItemsFindFirstArgs>(args?: SelectSubset<T, ClothingItemsFindFirstArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClothingItems that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsFindFirstOrThrowArgs} args - Arguments to find a ClothingItems
     * @example
     * // Get one ClothingItems
     * const clothingItems = await prisma.clothingItems.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClothingItemsFindFirstOrThrowArgs>(args?: SelectSubset<T, ClothingItemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClothingItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClothingItems
     * const clothingItems = await prisma.clothingItems.findMany()
     * 
     * // Get first 10 ClothingItems
     * const clothingItems = await prisma.clothingItems.findMany({ take: 10 })
     * 
     * // Only select the `clothing_id`
     * const clothingItemsWithClothing_idOnly = await prisma.clothingItems.findMany({ select: { clothing_id: true } })
     * 
     */
    findMany<T extends ClothingItemsFindManyArgs>(args?: SelectSubset<T, ClothingItemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClothingItems.
     * @param {ClothingItemsCreateArgs} args - Arguments to create a ClothingItems.
     * @example
     * // Create one ClothingItems
     * const ClothingItems = await prisma.clothingItems.create({
     *   data: {
     *     // ... data to create a ClothingItems
     *   }
     * })
     * 
     */
    create<T extends ClothingItemsCreateArgs>(args: SelectSubset<T, ClothingItemsCreateArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClothingItems.
     * @param {ClothingItemsCreateManyArgs} args - Arguments to create many ClothingItems.
     * @example
     * // Create many ClothingItems
     * const clothingItems = await prisma.clothingItems.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClothingItemsCreateManyArgs>(args?: SelectSubset<T, ClothingItemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClothingItems and returns the data saved in the database.
     * @param {ClothingItemsCreateManyAndReturnArgs} args - Arguments to create many ClothingItems.
     * @example
     * // Create many ClothingItems
     * const clothingItems = await prisma.clothingItems.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClothingItems and only return the `clothing_id`
     * const clothingItemsWithClothing_idOnly = await prisma.clothingItems.createManyAndReturn({
     *   select: { clothing_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClothingItemsCreateManyAndReturnArgs>(args?: SelectSubset<T, ClothingItemsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClothingItems.
     * @param {ClothingItemsDeleteArgs} args - Arguments to delete one ClothingItems.
     * @example
     * // Delete one ClothingItems
     * const ClothingItems = await prisma.clothingItems.delete({
     *   where: {
     *     // ... filter to delete one ClothingItems
     *   }
     * })
     * 
     */
    delete<T extends ClothingItemsDeleteArgs>(args: SelectSubset<T, ClothingItemsDeleteArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClothingItems.
     * @param {ClothingItemsUpdateArgs} args - Arguments to update one ClothingItems.
     * @example
     * // Update one ClothingItems
     * const clothingItems = await prisma.clothingItems.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClothingItemsUpdateArgs>(args: SelectSubset<T, ClothingItemsUpdateArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClothingItems.
     * @param {ClothingItemsDeleteManyArgs} args - Arguments to filter ClothingItems to delete.
     * @example
     * // Delete a few ClothingItems
     * const { count } = await prisma.clothingItems.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClothingItemsDeleteManyArgs>(args?: SelectSubset<T, ClothingItemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClothingItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClothingItems
     * const clothingItems = await prisma.clothingItems.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClothingItemsUpdateManyArgs>(args: SelectSubset<T, ClothingItemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClothingItems and returns the data updated in the database.
     * @param {ClothingItemsUpdateManyAndReturnArgs} args - Arguments to update many ClothingItems.
     * @example
     * // Update many ClothingItems
     * const clothingItems = await prisma.clothingItems.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClothingItems and only return the `clothing_id`
     * const clothingItemsWithClothing_idOnly = await prisma.clothingItems.updateManyAndReturn({
     *   select: { clothing_id: true },
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
    updateManyAndReturn<T extends ClothingItemsUpdateManyAndReturnArgs>(args: SelectSubset<T, ClothingItemsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClothingItems.
     * @param {ClothingItemsUpsertArgs} args - Arguments to update or create a ClothingItems.
     * @example
     * // Update or create a ClothingItems
     * const clothingItems = await prisma.clothingItems.upsert({
     *   create: {
     *     // ... data to create a ClothingItems
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClothingItems we want to update
     *   }
     * })
     */
    upsert<T extends ClothingItemsUpsertArgs>(args: SelectSubset<T, ClothingItemsUpsertArgs<ExtArgs>>): Prisma__ClothingItemsClient<$Result.GetResult<Prisma.$ClothingItemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClothingItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsCountArgs} args - Arguments to filter ClothingItems to count.
     * @example
     * // Count the number of ClothingItems
     * const count = await prisma.clothingItems.count({
     *   where: {
     *     // ... the filter for the ClothingItems we want to count
     *   }
     * })
    **/
    count<T extends ClothingItemsCountArgs>(
      args?: Subset<T, ClothingItemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClothingItemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClothingItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClothingItemsAggregateArgs>(args: Subset<T, ClothingItemsAggregateArgs>): Prisma.PrismaPromise<GetClothingItemsAggregateType<T>>

    /**
     * Group by ClothingItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClothingItemsGroupByArgs} args - Group by arguments.
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
      T extends ClothingItemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClothingItemsGroupByArgs['orderBy'] }
        : { orderBy?: ClothingItemsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClothingItemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClothingItemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClothingItems model
   */
  readonly fields: ClothingItemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClothingItems.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClothingItemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    donation_request<T extends DonationRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DonationRequestDefaultArgs<ExtArgs>>): Prisma__DonationRequestClient<$Result.GetResult<Prisma.$DonationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    donor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    owner<T extends ClothingItems$ownerArgs<ExtArgs> = {}>(args?: Subset<T, ClothingItems$ownerArgs<ExtArgs>>): Prisma__CharitiesClient<$Result.GetResult<Prisma.$CharitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    donation<T extends ClothingItems$donationArgs<ExtArgs> = {}>(args?: Subset<T, ClothingItems$donationArgs<ExtArgs>>): Prisma__DonationsClient<$Result.GetResult<Prisma.$DonationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClothingItems model
   */
  interface ClothingItemsFieldRefs {
    readonly clothing_id: FieldRef<"ClothingItems", 'Int'>
    readonly donation_request_id: FieldRef<"ClothingItems", 'Int'>
    readonly type: FieldRef<"ClothingItems", 'String'>
    readonly size: FieldRef<"ClothingItems", 'String'>
    readonly condition: FieldRef<"ClothingItems", 'String'>
    readonly donor_id: FieldRef<"ClothingItems", 'Int'>
    readonly donation_id: FieldRef<"ClothingItems", 'Int'>
    readonly owned_by: FieldRef<"ClothingItems", 'Int'>
    readonly front_image_url: FieldRef<"ClothingItems", 'String'>
    readonly back_image_url: FieldRef<"ClothingItems", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClothingItems findUnique
   */
  export type ClothingItemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * Filter, which ClothingItems to fetch.
     */
    where: ClothingItemsWhereUniqueInput
  }

  /**
   * ClothingItems findUniqueOrThrow
   */
  export type ClothingItemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * Filter, which ClothingItems to fetch.
     */
    where: ClothingItemsWhereUniqueInput
  }

  /**
   * ClothingItems findFirst
   */
  export type ClothingItemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * Filter, which ClothingItems to fetch.
     */
    where?: ClothingItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClothingItems to fetch.
     */
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClothingItems.
     */
    cursor?: ClothingItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClothingItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClothingItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClothingItems.
     */
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
  }

  /**
   * ClothingItems findFirstOrThrow
   */
  export type ClothingItemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * Filter, which ClothingItems to fetch.
     */
    where?: ClothingItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClothingItems to fetch.
     */
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClothingItems.
     */
    cursor?: ClothingItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClothingItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClothingItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClothingItems.
     */
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
  }

  /**
   * ClothingItems findMany
   */
  export type ClothingItemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * Filter, which ClothingItems to fetch.
     */
    where?: ClothingItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClothingItems to fetch.
     */
    orderBy?: ClothingItemsOrderByWithRelationInput | ClothingItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClothingItems.
     */
    cursor?: ClothingItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClothingItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClothingItems.
     */
    skip?: number
    distinct?: ClothingItemsScalarFieldEnum | ClothingItemsScalarFieldEnum[]
  }

  /**
   * ClothingItems create
   */
  export type ClothingItemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * The data needed to create a ClothingItems.
     */
    data: XOR<ClothingItemsCreateInput, ClothingItemsUncheckedCreateInput>
  }

  /**
   * ClothingItems createMany
   */
  export type ClothingItemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClothingItems.
     */
    data: ClothingItemsCreateManyInput | ClothingItemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClothingItems createManyAndReturn
   */
  export type ClothingItemsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * The data used to create many ClothingItems.
     */
    data: ClothingItemsCreateManyInput | ClothingItemsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClothingItems update
   */
  export type ClothingItemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * The data needed to update a ClothingItems.
     */
    data: XOR<ClothingItemsUpdateInput, ClothingItemsUncheckedUpdateInput>
    /**
     * Choose, which ClothingItems to update.
     */
    where: ClothingItemsWhereUniqueInput
  }

  /**
   * ClothingItems updateMany
   */
  export type ClothingItemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClothingItems.
     */
    data: XOR<ClothingItemsUpdateManyMutationInput, ClothingItemsUncheckedUpdateManyInput>
    /**
     * Filter which ClothingItems to update
     */
    where?: ClothingItemsWhereInput
    /**
     * Limit how many ClothingItems to update.
     */
    limit?: number
  }

  /**
   * ClothingItems updateManyAndReturn
   */
  export type ClothingItemsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * The data used to update ClothingItems.
     */
    data: XOR<ClothingItemsUpdateManyMutationInput, ClothingItemsUncheckedUpdateManyInput>
    /**
     * Filter which ClothingItems to update
     */
    where?: ClothingItemsWhereInput
    /**
     * Limit how many ClothingItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClothingItems upsert
   */
  export type ClothingItemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * The filter to search for the ClothingItems to update in case it exists.
     */
    where: ClothingItemsWhereUniqueInput
    /**
     * In case the ClothingItems found by the `where` argument doesn't exist, create a new ClothingItems with this data.
     */
    create: XOR<ClothingItemsCreateInput, ClothingItemsUncheckedCreateInput>
    /**
     * In case the ClothingItems was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClothingItemsUpdateInput, ClothingItemsUncheckedUpdateInput>
  }

  /**
   * ClothingItems delete
   */
  export type ClothingItemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
    /**
     * Filter which ClothingItems to delete.
     */
    where: ClothingItemsWhereUniqueInput
  }

  /**
   * ClothingItems deleteMany
   */
  export type ClothingItemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClothingItems to delete
     */
    where?: ClothingItemsWhereInput
    /**
     * Limit how many ClothingItems to delete.
     */
    limit?: number
  }

  /**
   * ClothingItems.owner
   */
  export type ClothingItems$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charities
     */
    select?: CharitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charities
     */
    omit?: CharitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharitiesInclude<ExtArgs> | null
    where?: CharitiesWhereInput
  }

  /**
   * ClothingItems.donation
   */
  export type ClothingItems$donationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donations
     */
    select?: DonationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donations
     */
    omit?: DonationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationsInclude<ExtArgs> | null
    where?: DonationsWhereInput
  }

  /**
   * ClothingItems without action
   */
  export type ClothingItemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClothingItems
     */
    select?: ClothingItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClothingItems
     */
    omit?: ClothingItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClothingItemsInclude<ExtArgs> | null
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


  export const CharitiesScalarFieldEnum: {
    charity_id: 'charity_id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    website: 'website',
    verified: 'verified',
    created_on: 'created_on',
    updated_on: 'updated_on',
    password_hash: 'password_hash'
  };

  export type CharitiesScalarFieldEnum = (typeof CharitiesScalarFieldEnum)[keyof typeof CharitiesScalarFieldEnum]


  export const CharityApplicationsScalarFieldEnum: {
    application_id: 'application_id',
    org_name: 'org_name',
    contact_name: 'contact_name',
    contact_email: 'contact_email',
    contact_number: 'contact_number',
    website: 'website',
    org_address: 'org_address',
    charity_number: 'charity_number',
    status: 'status',
    reviewed_on: 'reviewed_on',
    reviewed_by: 'reviewed_by',
    approved_on: 'approved_on',
    approved_by: 'approved_by',
    charity_id: 'charity_id',
    created_on: 'created_on',
    updated_on: 'updated_on'
  };

  export type CharityApplicationsScalarFieldEnum = (typeof CharityApplicationsScalarFieldEnum)[keyof typeof CharityApplicationsScalarFieldEnum]


  export const CharitySignupTokensScalarFieldEnum: {
    invite_id: 'invite_id',
    charity_id: 'charity_id',
    email: 'email',
    token: 'token',
    expires_on: 'expires_on',
    consumed_on: 'consumed_on',
    created_on: 'created_on',
    created_by: 'created_by'
  };

  export type CharitySignupTokensScalarFieldEnum = (typeof CharitySignupTokensScalarFieldEnum)[keyof typeof CharitySignupTokensScalarFieldEnum]


  export const DonationsScalarFieldEnum: {
    donation_id: 'donation_id',
    donation_request_id: 'donation_request_id',
    created_by: 'created_by',
    accepted_by: 'accepted_by',
    accepted_at: 'accepted_at'
  };

  export type DonationsScalarFieldEnum = (typeof DonationsScalarFieldEnum)[keyof typeof DonationsScalarFieldEnum]


  export const DonationRequestScalarFieldEnum: {
    donation_request_id: 'donation_request_id',
    title: 'title',
    created_on: 'created_on',
    updated_on: 'updated_on',
    status: 'status',
    answered_by: 'answered_by',
    created_by: 'created_by'
  };

  export type DonationRequestScalarFieldEnum = (typeof DonationRequestScalarFieldEnum)[keyof typeof DonationRequestScalarFieldEnum]


  export const ClothingItemsScalarFieldEnum: {
    clothing_id: 'clothing_id',
    donation_request_id: 'donation_request_id',
    type: 'type',
    size: 'size',
    condition: 'condition',
    donor_id: 'donor_id',
    donation_id: 'donation_id',
    owned_by: 'owned_by',
    front_image_url: 'front_image_url',
    back_image_url: 'back_image_url'
  };

  export type ClothingItemsScalarFieldEnum = (typeof ClothingItemsScalarFieldEnum)[keyof typeof ClothingItemsScalarFieldEnum]


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
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


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
    approved_applications?: CharityApplicationsListRelationFilter
    reviewed_applications?: CharityApplicationsListRelationFilter
    created_invites?: CharitySignupTokensListRelationFilter
    EmailVerificationTokens?: EmailVerificationTokensListRelationFilter
    PasswordResetTokens?: PasswordResetTokensListRelationFilter
    donation_requests?: DonationRequestListRelationFilter
    donations_created?: DonationsListRelationFilter
    ClothingItems?: ClothingItemsListRelationFilter
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
    approved_applications?: CharityApplicationsOrderByRelationAggregateInput
    reviewed_applications?: CharityApplicationsOrderByRelationAggregateInput
    created_invites?: CharitySignupTokensOrderByRelationAggregateInput
    EmailVerificationTokens?: EmailVerificationTokensOrderByRelationAggregateInput
    PasswordResetTokens?: PasswordResetTokensOrderByRelationAggregateInput
    donation_requests?: DonationRequestOrderByRelationAggregateInput
    donations_created?: DonationsOrderByRelationAggregateInput
    ClothingItems?: ClothingItemsOrderByRelationAggregateInput
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
    approved_applications?: CharityApplicationsListRelationFilter
    reviewed_applications?: CharityApplicationsListRelationFilter
    created_invites?: CharitySignupTokensListRelationFilter
    EmailVerificationTokens?: EmailVerificationTokensListRelationFilter
    PasswordResetTokens?: PasswordResetTokensListRelationFilter
    donation_requests?: DonationRequestListRelationFilter
    donations_created?: DonationsListRelationFilter
    ClothingItems?: ClothingItemsListRelationFilter
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

  export type CharitiesWhereInput = {
    AND?: CharitiesWhereInput | CharitiesWhereInput[]
    OR?: CharitiesWhereInput[]
    NOT?: CharitiesWhereInput | CharitiesWhereInput[]
    charity_id?: IntFilter<"Charities"> | number
    name?: StringFilter<"Charities"> | string
    email?: StringFilter<"Charities"> | string
    phone?: StringFilter<"Charities"> | string
    address?: StringFilter<"Charities"> | string
    website?: StringFilter<"Charities"> | string
    verified?: BoolFilter<"Charities"> | boolean
    created_on?: DateTimeFilter<"Charities"> | Date | string
    updated_on?: DateTimeFilter<"Charities"> | Date | string
    password_hash?: StringNullableFilter<"Charities"> | string | null
    applications?: CharityApplicationsListRelationFilter
    signup_tokens?: CharitySignupTokensListRelationFilter
    donation_requests_answered?: DonationRequestListRelationFilter
    donations_received?: DonationsListRelationFilter
    ClothingItems?: ClothingItemsListRelationFilter
  }

  export type CharitiesOrderByWithRelationInput = {
    charity_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    verified?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    applications?: CharityApplicationsOrderByRelationAggregateInput
    signup_tokens?: CharitySignupTokensOrderByRelationAggregateInput
    donation_requests_answered?: DonationRequestOrderByRelationAggregateInput
    donations_received?: DonationsOrderByRelationAggregateInput
    ClothingItems?: ClothingItemsOrderByRelationAggregateInput
  }

  export type CharitiesWhereUniqueInput = Prisma.AtLeast<{
    charity_id?: number
    email?: string
    AND?: CharitiesWhereInput | CharitiesWhereInput[]
    OR?: CharitiesWhereInput[]
    NOT?: CharitiesWhereInput | CharitiesWhereInput[]
    name?: StringFilter<"Charities"> | string
    phone?: StringFilter<"Charities"> | string
    address?: StringFilter<"Charities"> | string
    website?: StringFilter<"Charities"> | string
    verified?: BoolFilter<"Charities"> | boolean
    created_on?: DateTimeFilter<"Charities"> | Date | string
    updated_on?: DateTimeFilter<"Charities"> | Date | string
    password_hash?: StringNullableFilter<"Charities"> | string | null
    applications?: CharityApplicationsListRelationFilter
    signup_tokens?: CharitySignupTokensListRelationFilter
    donation_requests_answered?: DonationRequestListRelationFilter
    donations_received?: DonationsListRelationFilter
    ClothingItems?: ClothingItemsListRelationFilter
  }, "charity_id" | "email">

  export type CharitiesOrderByWithAggregationInput = {
    charity_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    verified?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    _count?: CharitiesCountOrderByAggregateInput
    _avg?: CharitiesAvgOrderByAggregateInput
    _max?: CharitiesMaxOrderByAggregateInput
    _min?: CharitiesMinOrderByAggregateInput
    _sum?: CharitiesSumOrderByAggregateInput
  }

  export type CharitiesScalarWhereWithAggregatesInput = {
    AND?: CharitiesScalarWhereWithAggregatesInput | CharitiesScalarWhereWithAggregatesInput[]
    OR?: CharitiesScalarWhereWithAggregatesInput[]
    NOT?: CharitiesScalarWhereWithAggregatesInput | CharitiesScalarWhereWithAggregatesInput[]
    charity_id?: IntWithAggregatesFilter<"Charities"> | number
    name?: StringWithAggregatesFilter<"Charities"> | string
    email?: StringWithAggregatesFilter<"Charities"> | string
    phone?: StringWithAggregatesFilter<"Charities"> | string
    address?: StringWithAggregatesFilter<"Charities"> | string
    website?: StringWithAggregatesFilter<"Charities"> | string
    verified?: BoolWithAggregatesFilter<"Charities"> | boolean
    created_on?: DateTimeWithAggregatesFilter<"Charities"> | Date | string
    updated_on?: DateTimeWithAggregatesFilter<"Charities"> | Date | string
    password_hash?: StringNullableWithAggregatesFilter<"Charities"> | string | null
  }

  export type CharityApplicationsWhereInput = {
    AND?: CharityApplicationsWhereInput | CharityApplicationsWhereInput[]
    OR?: CharityApplicationsWhereInput[]
    NOT?: CharityApplicationsWhereInput | CharityApplicationsWhereInput[]
    application_id?: IntFilter<"CharityApplications"> | number
    org_name?: StringFilter<"CharityApplications"> | string
    contact_name?: StringFilter<"CharityApplications"> | string
    contact_email?: StringFilter<"CharityApplications"> | string
    contact_number?: StringFilter<"CharityApplications"> | string
    website?: StringFilter<"CharityApplications"> | string
    org_address?: StringFilter<"CharityApplications"> | string
    charity_number?: StringNullableFilter<"CharityApplications"> | string | null
    status?: EnumStatusFilter<"CharityApplications"> | $Enums.Status
    reviewed_on?: DateTimeNullableFilter<"CharityApplications"> | Date | string | null
    reviewed_by?: IntNullableFilter<"CharityApplications"> | number | null
    approved_on?: DateTimeNullableFilter<"CharityApplications"> | Date | string | null
    approved_by?: IntNullableFilter<"CharityApplications"> | number | null
    charity_id?: IntNullableFilter<"CharityApplications"> | number | null
    created_on?: DateTimeFilter<"CharityApplications"> | Date | string
    updated_on?: DateTimeFilter<"CharityApplications"> | Date | string
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    charity?: XOR<CharitiesNullableScalarRelationFilter, CharitiesWhereInput> | null
  }

  export type CharityApplicationsOrderByWithRelationInput = {
    application_id?: SortOrder
    org_name?: SortOrder
    contact_name?: SortOrder
    contact_email?: SortOrder
    contact_number?: SortOrder
    website?: SortOrder
    org_address?: SortOrder
    charity_number?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewed_on?: SortOrderInput | SortOrder
    reviewed_by?: SortOrderInput | SortOrder
    approved_on?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    charity_id?: SortOrderInput | SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    approver?: UserOrderByWithRelationInput
    reviewer?: UserOrderByWithRelationInput
    charity?: CharitiesOrderByWithRelationInput
  }

  export type CharityApplicationsWhereUniqueInput = Prisma.AtLeast<{
    application_id?: number
    AND?: CharityApplicationsWhereInput | CharityApplicationsWhereInput[]
    OR?: CharityApplicationsWhereInput[]
    NOT?: CharityApplicationsWhereInput | CharityApplicationsWhereInput[]
    org_name?: StringFilter<"CharityApplications"> | string
    contact_name?: StringFilter<"CharityApplications"> | string
    contact_email?: StringFilter<"CharityApplications"> | string
    contact_number?: StringFilter<"CharityApplications"> | string
    website?: StringFilter<"CharityApplications"> | string
    org_address?: StringFilter<"CharityApplications"> | string
    charity_number?: StringNullableFilter<"CharityApplications"> | string | null
    status?: EnumStatusFilter<"CharityApplications"> | $Enums.Status
    reviewed_on?: DateTimeNullableFilter<"CharityApplications"> | Date | string | null
    reviewed_by?: IntNullableFilter<"CharityApplications"> | number | null
    approved_on?: DateTimeNullableFilter<"CharityApplications"> | Date | string | null
    approved_by?: IntNullableFilter<"CharityApplications"> | number | null
    charity_id?: IntNullableFilter<"CharityApplications"> | number | null
    created_on?: DateTimeFilter<"CharityApplications"> | Date | string
    updated_on?: DateTimeFilter<"CharityApplications"> | Date | string
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    charity?: XOR<CharitiesNullableScalarRelationFilter, CharitiesWhereInput> | null
  }, "application_id">

  export type CharityApplicationsOrderByWithAggregationInput = {
    application_id?: SortOrder
    org_name?: SortOrder
    contact_name?: SortOrder
    contact_email?: SortOrder
    contact_number?: SortOrder
    website?: SortOrder
    org_address?: SortOrder
    charity_number?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewed_on?: SortOrderInput | SortOrder
    reviewed_by?: SortOrderInput | SortOrder
    approved_on?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    charity_id?: SortOrderInput | SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    _count?: CharityApplicationsCountOrderByAggregateInput
    _avg?: CharityApplicationsAvgOrderByAggregateInput
    _max?: CharityApplicationsMaxOrderByAggregateInput
    _min?: CharityApplicationsMinOrderByAggregateInput
    _sum?: CharityApplicationsSumOrderByAggregateInput
  }

  export type CharityApplicationsScalarWhereWithAggregatesInput = {
    AND?: CharityApplicationsScalarWhereWithAggregatesInput | CharityApplicationsScalarWhereWithAggregatesInput[]
    OR?: CharityApplicationsScalarWhereWithAggregatesInput[]
    NOT?: CharityApplicationsScalarWhereWithAggregatesInput | CharityApplicationsScalarWhereWithAggregatesInput[]
    application_id?: IntWithAggregatesFilter<"CharityApplications"> | number
    org_name?: StringWithAggregatesFilter<"CharityApplications"> | string
    contact_name?: StringWithAggregatesFilter<"CharityApplications"> | string
    contact_email?: StringWithAggregatesFilter<"CharityApplications"> | string
    contact_number?: StringWithAggregatesFilter<"CharityApplications"> | string
    website?: StringWithAggregatesFilter<"CharityApplications"> | string
    org_address?: StringWithAggregatesFilter<"CharityApplications"> | string
    charity_number?: StringNullableWithAggregatesFilter<"CharityApplications"> | string | null
    status?: EnumStatusWithAggregatesFilter<"CharityApplications"> | $Enums.Status
    reviewed_on?: DateTimeNullableWithAggregatesFilter<"CharityApplications"> | Date | string | null
    reviewed_by?: IntNullableWithAggregatesFilter<"CharityApplications"> | number | null
    approved_on?: DateTimeNullableWithAggregatesFilter<"CharityApplications"> | Date | string | null
    approved_by?: IntNullableWithAggregatesFilter<"CharityApplications"> | number | null
    charity_id?: IntNullableWithAggregatesFilter<"CharityApplications"> | number | null
    created_on?: DateTimeWithAggregatesFilter<"CharityApplications"> | Date | string
    updated_on?: DateTimeWithAggregatesFilter<"CharityApplications"> | Date | string
  }

  export type CharitySignupTokensWhereInput = {
    AND?: CharitySignupTokensWhereInput | CharitySignupTokensWhereInput[]
    OR?: CharitySignupTokensWhereInput[]
    NOT?: CharitySignupTokensWhereInput | CharitySignupTokensWhereInput[]
    invite_id?: IntFilter<"CharitySignupTokens"> | number
    charity_id?: IntFilter<"CharitySignupTokens"> | number
    email?: StringFilter<"CharitySignupTokens"> | string
    token?: StringFilter<"CharitySignupTokens"> | string
    expires_on?: DateTimeFilter<"CharitySignupTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"CharitySignupTokens"> | Date | string | null
    created_on?: DateTimeFilter<"CharitySignupTokens"> | Date | string
    created_by?: IntNullableFilter<"CharitySignupTokens"> | number | null
    charity?: XOR<CharitiesScalarRelationFilter, CharitiesWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CharitySignupTokensOrderByWithRelationInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrderInput | SortOrder
    created_on?: SortOrder
    created_by?: SortOrderInput | SortOrder
    charity?: CharitiesOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
  }

  export type CharitySignupTokensWhereUniqueInput = Prisma.AtLeast<{
    invite_id?: number
    token?: string
    AND?: CharitySignupTokensWhereInput | CharitySignupTokensWhereInput[]
    OR?: CharitySignupTokensWhereInput[]
    NOT?: CharitySignupTokensWhereInput | CharitySignupTokensWhereInput[]
    charity_id?: IntFilter<"CharitySignupTokens"> | number
    email?: StringFilter<"CharitySignupTokens"> | string
    expires_on?: DateTimeFilter<"CharitySignupTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"CharitySignupTokens"> | Date | string | null
    created_on?: DateTimeFilter<"CharitySignupTokens"> | Date | string
    created_by?: IntNullableFilter<"CharitySignupTokens"> | number | null
    charity?: XOR<CharitiesScalarRelationFilter, CharitiesWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "invite_id" | "token">

  export type CharitySignupTokensOrderByWithAggregationInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrderInput | SortOrder
    created_on?: SortOrder
    created_by?: SortOrderInput | SortOrder
    _count?: CharitySignupTokensCountOrderByAggregateInput
    _avg?: CharitySignupTokensAvgOrderByAggregateInput
    _max?: CharitySignupTokensMaxOrderByAggregateInput
    _min?: CharitySignupTokensMinOrderByAggregateInput
    _sum?: CharitySignupTokensSumOrderByAggregateInput
  }

  export type CharitySignupTokensScalarWhereWithAggregatesInput = {
    AND?: CharitySignupTokensScalarWhereWithAggregatesInput | CharitySignupTokensScalarWhereWithAggregatesInput[]
    OR?: CharitySignupTokensScalarWhereWithAggregatesInput[]
    NOT?: CharitySignupTokensScalarWhereWithAggregatesInput | CharitySignupTokensScalarWhereWithAggregatesInput[]
    invite_id?: IntWithAggregatesFilter<"CharitySignupTokens"> | number
    charity_id?: IntWithAggregatesFilter<"CharitySignupTokens"> | number
    email?: StringWithAggregatesFilter<"CharitySignupTokens"> | string
    token?: StringWithAggregatesFilter<"CharitySignupTokens"> | string
    expires_on?: DateTimeWithAggregatesFilter<"CharitySignupTokens"> | Date | string
    consumed_on?: DateTimeNullableWithAggregatesFilter<"CharitySignupTokens"> | Date | string | null
    created_on?: DateTimeWithAggregatesFilter<"CharitySignupTokens"> | Date | string
    created_by?: IntNullableWithAggregatesFilter<"CharitySignupTokens"> | number | null
  }

  export type DonationsWhereInput = {
    AND?: DonationsWhereInput | DonationsWhereInput[]
    OR?: DonationsWhereInput[]
    NOT?: DonationsWhereInput | DonationsWhereInput[]
    donation_id?: IntFilter<"Donations"> | number
    donation_request_id?: IntFilter<"Donations"> | number
    created_by?: IntFilter<"Donations"> | number
    accepted_by?: IntFilter<"Donations"> | number
    accepted_at?: DateTimeFilter<"Donations"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    accepted?: XOR<CharitiesScalarRelationFilter, CharitiesWhereInput>
    request?: XOR<DonationRequestScalarRelationFilter, DonationRequestWhereInput>
    ClothingItems?: ClothingItemsListRelationFilter
  }

  export type DonationsOrderByWithRelationInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
    accepted_at?: SortOrder
    creator?: UserOrderByWithRelationInput
    accepted?: CharitiesOrderByWithRelationInput
    request?: DonationRequestOrderByWithRelationInput
    ClothingItems?: ClothingItemsOrderByRelationAggregateInput
  }

  export type DonationsWhereUniqueInput = Prisma.AtLeast<{
    donation_id?: number
    donation_request_id?: number
    AND?: DonationsWhereInput | DonationsWhereInput[]
    OR?: DonationsWhereInput[]
    NOT?: DonationsWhereInput | DonationsWhereInput[]
    created_by?: IntFilter<"Donations"> | number
    accepted_by?: IntFilter<"Donations"> | number
    accepted_at?: DateTimeFilter<"Donations"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    accepted?: XOR<CharitiesScalarRelationFilter, CharitiesWhereInput>
    request?: XOR<DonationRequestScalarRelationFilter, DonationRequestWhereInput>
    ClothingItems?: ClothingItemsListRelationFilter
  }, "donation_id" | "donation_request_id">

  export type DonationsOrderByWithAggregationInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
    accepted_at?: SortOrder
    _count?: DonationsCountOrderByAggregateInput
    _avg?: DonationsAvgOrderByAggregateInput
    _max?: DonationsMaxOrderByAggregateInput
    _min?: DonationsMinOrderByAggregateInput
    _sum?: DonationsSumOrderByAggregateInput
  }

  export type DonationsScalarWhereWithAggregatesInput = {
    AND?: DonationsScalarWhereWithAggregatesInput | DonationsScalarWhereWithAggregatesInput[]
    OR?: DonationsScalarWhereWithAggregatesInput[]
    NOT?: DonationsScalarWhereWithAggregatesInput | DonationsScalarWhereWithAggregatesInput[]
    donation_id?: IntWithAggregatesFilter<"Donations"> | number
    donation_request_id?: IntWithAggregatesFilter<"Donations"> | number
    created_by?: IntWithAggregatesFilter<"Donations"> | number
    accepted_by?: IntWithAggregatesFilter<"Donations"> | number
    accepted_at?: DateTimeWithAggregatesFilter<"Donations"> | Date | string
  }

  export type DonationRequestWhereInput = {
    AND?: DonationRequestWhereInput | DonationRequestWhereInput[]
    OR?: DonationRequestWhereInput[]
    NOT?: DonationRequestWhereInput | DonationRequestWhereInput[]
    donation_request_id?: IntFilter<"DonationRequest"> | number
    title?: StringFilter<"DonationRequest"> | string
    created_on?: DateTimeFilter<"DonationRequest"> | Date | string
    updated_on?: DateTimeFilter<"DonationRequest"> | Date | string
    status?: EnumStatusFilter<"DonationRequest"> | $Enums.Status
    answered_by?: IntNullableFilter<"DonationRequest"> | number | null
    created_by?: IntFilter<"DonationRequest"> | number
    accepted_donation?: XOR<DonationsNullableScalarRelationFilter, DonationsWhereInput> | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    answering_charity?: XOR<CharitiesNullableScalarRelationFilter, CharitiesWhereInput> | null
    ClothingItems?: ClothingItemsListRelationFilter
  }

  export type DonationRequestOrderByWithRelationInput = {
    donation_request_id?: SortOrder
    title?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    status?: SortOrder
    answered_by?: SortOrderInput | SortOrder
    created_by?: SortOrder
    accepted_donation?: DonationsOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    answering_charity?: CharitiesOrderByWithRelationInput
    ClothingItems?: ClothingItemsOrderByRelationAggregateInput
  }

  export type DonationRequestWhereUniqueInput = Prisma.AtLeast<{
    donation_request_id?: number
    AND?: DonationRequestWhereInput | DonationRequestWhereInput[]
    OR?: DonationRequestWhereInput[]
    NOT?: DonationRequestWhereInput | DonationRequestWhereInput[]
    title?: StringFilter<"DonationRequest"> | string
    created_on?: DateTimeFilter<"DonationRequest"> | Date | string
    updated_on?: DateTimeFilter<"DonationRequest"> | Date | string
    status?: EnumStatusFilter<"DonationRequest"> | $Enums.Status
    answered_by?: IntNullableFilter<"DonationRequest"> | number | null
    created_by?: IntFilter<"DonationRequest"> | number
    accepted_donation?: XOR<DonationsNullableScalarRelationFilter, DonationsWhereInput> | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    answering_charity?: XOR<CharitiesNullableScalarRelationFilter, CharitiesWhereInput> | null
    ClothingItems?: ClothingItemsListRelationFilter
  }, "donation_request_id">

  export type DonationRequestOrderByWithAggregationInput = {
    donation_request_id?: SortOrder
    title?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    status?: SortOrder
    answered_by?: SortOrderInput | SortOrder
    created_by?: SortOrder
    _count?: DonationRequestCountOrderByAggregateInput
    _avg?: DonationRequestAvgOrderByAggregateInput
    _max?: DonationRequestMaxOrderByAggregateInput
    _min?: DonationRequestMinOrderByAggregateInput
    _sum?: DonationRequestSumOrderByAggregateInput
  }

  export type DonationRequestScalarWhereWithAggregatesInput = {
    AND?: DonationRequestScalarWhereWithAggregatesInput | DonationRequestScalarWhereWithAggregatesInput[]
    OR?: DonationRequestScalarWhereWithAggregatesInput[]
    NOT?: DonationRequestScalarWhereWithAggregatesInput | DonationRequestScalarWhereWithAggregatesInput[]
    donation_request_id?: IntWithAggregatesFilter<"DonationRequest"> | number
    title?: StringWithAggregatesFilter<"DonationRequest"> | string
    created_on?: DateTimeWithAggregatesFilter<"DonationRequest"> | Date | string
    updated_on?: DateTimeWithAggregatesFilter<"DonationRequest"> | Date | string
    status?: EnumStatusWithAggregatesFilter<"DonationRequest"> | $Enums.Status
    answered_by?: IntNullableWithAggregatesFilter<"DonationRequest"> | number | null
    created_by?: IntWithAggregatesFilter<"DonationRequest"> | number
  }

  export type ClothingItemsWhereInput = {
    AND?: ClothingItemsWhereInput | ClothingItemsWhereInput[]
    OR?: ClothingItemsWhereInput[]
    NOT?: ClothingItemsWhereInput | ClothingItemsWhereInput[]
    clothing_id?: IntFilter<"ClothingItems"> | number
    donation_request_id?: IntFilter<"ClothingItems"> | number
    type?: StringFilter<"ClothingItems"> | string
    size?: StringFilter<"ClothingItems"> | string
    condition?: StringFilter<"ClothingItems"> | string
    donor_id?: IntFilter<"ClothingItems"> | number
    donation_id?: IntNullableFilter<"ClothingItems"> | number | null
    owned_by?: IntNullableFilter<"ClothingItems"> | number | null
    front_image_url?: StringFilter<"ClothingItems"> | string
    back_image_url?: StringFilter<"ClothingItems"> | string
    donation_request?: XOR<DonationRequestScalarRelationFilter, DonationRequestWhereInput>
    donor?: XOR<UserScalarRelationFilter, UserWhereInput>
    owner?: XOR<CharitiesNullableScalarRelationFilter, CharitiesWhereInput> | null
    donation?: XOR<DonationsNullableScalarRelationFilter, DonationsWhereInput> | null
  }

  export type ClothingItemsOrderByWithRelationInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    type?: SortOrder
    size?: SortOrder
    condition?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrderInput | SortOrder
    owned_by?: SortOrderInput | SortOrder
    front_image_url?: SortOrder
    back_image_url?: SortOrder
    donation_request?: DonationRequestOrderByWithRelationInput
    donor?: UserOrderByWithRelationInput
    owner?: CharitiesOrderByWithRelationInput
    donation?: DonationsOrderByWithRelationInput
  }

  export type ClothingItemsWhereUniqueInput = Prisma.AtLeast<{
    clothing_id?: number
    AND?: ClothingItemsWhereInput | ClothingItemsWhereInput[]
    OR?: ClothingItemsWhereInput[]
    NOT?: ClothingItemsWhereInput | ClothingItemsWhereInput[]
    donation_request_id?: IntFilter<"ClothingItems"> | number
    type?: StringFilter<"ClothingItems"> | string
    size?: StringFilter<"ClothingItems"> | string
    condition?: StringFilter<"ClothingItems"> | string
    donor_id?: IntFilter<"ClothingItems"> | number
    donation_id?: IntNullableFilter<"ClothingItems"> | number | null
    owned_by?: IntNullableFilter<"ClothingItems"> | number | null
    front_image_url?: StringFilter<"ClothingItems"> | string
    back_image_url?: StringFilter<"ClothingItems"> | string
    donation_request?: XOR<DonationRequestScalarRelationFilter, DonationRequestWhereInput>
    donor?: XOR<UserScalarRelationFilter, UserWhereInput>
    owner?: XOR<CharitiesNullableScalarRelationFilter, CharitiesWhereInput> | null
    donation?: XOR<DonationsNullableScalarRelationFilter, DonationsWhereInput> | null
  }, "clothing_id">

  export type ClothingItemsOrderByWithAggregationInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    type?: SortOrder
    size?: SortOrder
    condition?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrderInput | SortOrder
    owned_by?: SortOrderInput | SortOrder
    front_image_url?: SortOrder
    back_image_url?: SortOrder
    _count?: ClothingItemsCountOrderByAggregateInput
    _avg?: ClothingItemsAvgOrderByAggregateInput
    _max?: ClothingItemsMaxOrderByAggregateInput
    _min?: ClothingItemsMinOrderByAggregateInput
    _sum?: ClothingItemsSumOrderByAggregateInput
  }

  export type ClothingItemsScalarWhereWithAggregatesInput = {
    AND?: ClothingItemsScalarWhereWithAggregatesInput | ClothingItemsScalarWhereWithAggregatesInput[]
    OR?: ClothingItemsScalarWhereWithAggregatesInput[]
    NOT?: ClothingItemsScalarWhereWithAggregatesInput | ClothingItemsScalarWhereWithAggregatesInput[]
    clothing_id?: IntWithAggregatesFilter<"ClothingItems"> | number
    donation_request_id?: IntWithAggregatesFilter<"ClothingItems"> | number
    type?: StringWithAggregatesFilter<"ClothingItems"> | string
    size?: StringWithAggregatesFilter<"ClothingItems"> | string
    condition?: StringWithAggregatesFilter<"ClothingItems"> | string
    donor_id?: IntWithAggregatesFilter<"ClothingItems"> | number
    donation_id?: IntNullableWithAggregatesFilter<"ClothingItems"> | number | null
    owned_by?: IntNullableWithAggregatesFilter<"ClothingItems"> | number | null
    front_image_url?: StringWithAggregatesFilter<"ClothingItems"> | string
    back_image_url?: StringWithAggregatesFilter<"ClothingItems"> | string
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
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
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
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
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
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
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
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
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

  export type CharitiesCreateInput = {
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesUncheckedCreateInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsUncheckedCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensUncheckedCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestUncheckedCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsUncheckedCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesUncheckedUpdateInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUncheckedUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUncheckedUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUncheckedUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUncheckedUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesCreateManyInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
  }

  export type CharitiesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CharitiesUncheckedUpdateManyInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CharityApplicationsCreateInput = {
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    approved_on?: Date | string | null
    created_on?: Date | string
    updated_on?: Date | string
    approver?: UserCreateNestedOneWithoutApproved_applicationsInput
    reviewer?: UserCreateNestedOneWithoutReviewed_applicationsInput
    charity?: CharitiesCreateNestedOneWithoutApplicationsInput
  }

  export type CharityApplicationsUncheckedCreateInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    reviewed_by?: number | null
    approved_on?: Date | string | null
    approved_by?: number | null
    charity_id?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharityApplicationsUpdateInput = {
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approver?: UserUpdateOneWithoutApproved_applicationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewed_applicationsNestedInput
    charity?: CharitiesUpdateOneWithoutApplicationsNestedInput
  }

  export type CharityApplicationsUncheckedUpdateInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    charity_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsCreateManyInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    reviewed_by?: number | null
    approved_on?: Date | string | null
    approved_by?: number | null
    charity_id?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharityApplicationsUpdateManyMutationInput = {
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsUncheckedUpdateManyInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    charity_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharitySignupTokensCreateInput = {
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    charity: CharitiesCreateNestedOneWithoutSignup_tokensInput
    creator?: UserCreateNestedOneWithoutCreated_invitesInput
  }

  export type CharitySignupTokensUncheckedCreateInput = {
    invite_id?: number
    charity_id: number
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    created_by?: number | null
  }

  export type CharitySignupTokensUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    charity?: CharitiesUpdateOneRequiredWithoutSignup_tokensNestedInput
    creator?: UserUpdateOneWithoutCreated_invitesNestedInput
  }

  export type CharitySignupTokensUncheckedUpdateInput = {
    invite_id?: IntFieldUpdateOperationsInput | number
    charity_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CharitySignupTokensCreateManyInput = {
    invite_id?: number
    charity_id: number
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    created_by?: number | null
  }

  export type CharitySignupTokensUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharitySignupTokensUncheckedUpdateManyInput = {
    invite_id?: IntFieldUpdateOperationsInput | number
    charity_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DonationsCreateInput = {
    accepted_at?: Date | string
    creator: UserCreateNestedOneWithoutDonations_createdInput
    accepted: CharitiesCreateNestedOneWithoutDonations_receivedInput
    request: DonationRequestCreateNestedOneWithoutAccepted_donationInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonationInput
  }

  export type DonationsUncheckedCreateInput = {
    donation_id?: number
    donation_request_id: number
    created_by: number
    accepted_by: number
    accepted_at?: Date | string
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationsUpdateInput = {
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutDonations_createdNestedInput
    accepted?: CharitiesUpdateOneRequiredWithoutDonations_receivedNestedInput
    request?: DonationRequestUpdateOneRequiredWithoutAccepted_donationNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonationNestedInput
  }

  export type DonationsUncheckedUpdateInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationsCreateManyInput = {
    donation_id?: number
    donation_request_id: number
    created_by: number
    accepted_by: number
    accepted_at?: Date | string
  }

  export type DonationsUpdateManyMutationInput = {
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationsUncheckedUpdateManyInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationRequestCreateInput = {
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    accepted_donation?: DonationsCreateNestedOneWithoutRequestInput
    creator: UserCreateNestedOneWithoutDonation_requestsInput
    answering_charity?: CharitiesCreateNestedOneWithoutDonation_requests_answeredInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestUncheckedCreateInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    answered_by?: number | null
    created_by: number
    accepted_donation?: DonationsUncheckedCreateNestedOneWithoutRequestInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    accepted_donation?: DonationsUpdateOneWithoutRequestNestedInput
    creator?: UserUpdateOneRequiredWithoutDonation_requestsNestedInput
    answering_charity?: CharitiesUpdateOneWithoutDonation_requests_answeredNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestUncheckedUpdateInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    answered_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_donation?: DonationsUncheckedUpdateOneWithoutRequestNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestCreateManyInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    answered_by?: number | null
    created_by: number
  }

  export type DonationRequestUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type DonationRequestUncheckedUpdateManyInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    answered_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: IntFieldUpdateOperationsInput | number
  }

  export type ClothingItemsCreateInput = {
    type: string
    size: string
    condition: string
    front_image_url: string
    back_image_url: string
    donation_request: DonationRequestCreateNestedOneWithoutClothingItemsInput
    donor: UserCreateNestedOneWithoutClothingItemsInput
    owner?: CharitiesCreateNestedOneWithoutClothingItemsInput
    donation?: DonationsCreateNestedOneWithoutClothingItemsInput
  }

  export type ClothingItemsUncheckedCreateInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id?: number | null
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
    donation_request?: DonationRequestUpdateOneRequiredWithoutClothingItemsNestedInput
    donor?: UserUpdateOneRequiredWithoutClothingItemsNestedInput
    owner?: CharitiesUpdateOneWithoutClothingItemsNestedInput
    donation?: DonationsUpdateOneWithoutClothingItemsNestedInput
  }

  export type ClothingItemsUncheckedUpdateInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsCreateManyInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id?: number | null
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsUncheckedUpdateManyInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
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

  export type CharityApplicationsListRelationFilter = {
    every?: CharityApplicationsWhereInput
    some?: CharityApplicationsWhereInput
    none?: CharityApplicationsWhereInput
  }

  export type CharitySignupTokensListRelationFilter = {
    every?: CharitySignupTokensWhereInput
    some?: CharitySignupTokensWhereInput
    none?: CharitySignupTokensWhereInput
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

  export type DonationRequestListRelationFilter = {
    every?: DonationRequestWhereInput
    some?: DonationRequestWhereInput
    none?: DonationRequestWhereInput
  }

  export type DonationsListRelationFilter = {
    every?: DonationsWhereInput
    some?: DonationsWhereInput
    none?: DonationsWhereInput
  }

  export type ClothingItemsListRelationFilter = {
    every?: ClothingItemsWhereInput
    some?: ClothingItemsWhereInput
    none?: ClothingItemsWhereInput
  }

  export type CharityApplicationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CharitySignupTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailVerificationTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetTokensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DonationRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DonationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClothingItemsOrderByRelationAggregateInput = {
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CharitiesCountOrderByAggregateInput = {
    charity_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    verified?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    password_hash?: SortOrder
  }

  export type CharitiesAvgOrderByAggregateInput = {
    charity_id?: SortOrder
  }

  export type CharitiesMaxOrderByAggregateInput = {
    charity_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    verified?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    password_hash?: SortOrder
  }

  export type CharitiesMinOrderByAggregateInput = {
    charity_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    verified?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    password_hash?: SortOrder
  }

  export type CharitiesSumOrderByAggregateInput = {
    charity_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CharitiesNullableScalarRelationFilter = {
    is?: CharitiesWhereInput | null
    isNot?: CharitiesWhereInput | null
  }

  export type CharityApplicationsCountOrderByAggregateInput = {
    application_id?: SortOrder
    org_name?: SortOrder
    contact_name?: SortOrder
    contact_email?: SortOrder
    contact_number?: SortOrder
    website?: SortOrder
    org_address?: SortOrder
    charity_number?: SortOrder
    status?: SortOrder
    reviewed_on?: SortOrder
    reviewed_by?: SortOrder
    approved_on?: SortOrder
    approved_by?: SortOrder
    charity_id?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
  }

  export type CharityApplicationsAvgOrderByAggregateInput = {
    application_id?: SortOrder
    reviewed_by?: SortOrder
    approved_by?: SortOrder
    charity_id?: SortOrder
  }

  export type CharityApplicationsMaxOrderByAggregateInput = {
    application_id?: SortOrder
    org_name?: SortOrder
    contact_name?: SortOrder
    contact_email?: SortOrder
    contact_number?: SortOrder
    website?: SortOrder
    org_address?: SortOrder
    charity_number?: SortOrder
    status?: SortOrder
    reviewed_on?: SortOrder
    reviewed_by?: SortOrder
    approved_on?: SortOrder
    approved_by?: SortOrder
    charity_id?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
  }

  export type CharityApplicationsMinOrderByAggregateInput = {
    application_id?: SortOrder
    org_name?: SortOrder
    contact_name?: SortOrder
    contact_email?: SortOrder
    contact_number?: SortOrder
    website?: SortOrder
    org_address?: SortOrder
    charity_number?: SortOrder
    status?: SortOrder
    reviewed_on?: SortOrder
    reviewed_by?: SortOrder
    approved_on?: SortOrder
    approved_by?: SortOrder
    charity_id?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
  }

  export type CharityApplicationsSumOrderByAggregateInput = {
    application_id?: SortOrder
    reviewed_by?: SortOrder
    approved_by?: SortOrder
    charity_id?: SortOrder
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CharitiesScalarRelationFilter = {
    is?: CharitiesWhereInput
    isNot?: CharitiesWhereInput
  }

  export type CharitySignupTokensCountOrderByAggregateInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
    created_by?: SortOrder
  }

  export type CharitySignupTokensAvgOrderByAggregateInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    created_by?: SortOrder
  }

  export type CharitySignupTokensMaxOrderByAggregateInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
    created_by?: SortOrder
  }

  export type CharitySignupTokensMinOrderByAggregateInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_on?: SortOrder
    consumed_on?: SortOrder
    created_on?: SortOrder
    created_by?: SortOrder
  }

  export type CharitySignupTokensSumOrderByAggregateInput = {
    invite_id?: SortOrder
    charity_id?: SortOrder
    created_by?: SortOrder
  }

  export type DonationRequestScalarRelationFilter = {
    is?: DonationRequestWhereInput
    isNot?: DonationRequestWhereInput
  }

  export type DonationsCountOrderByAggregateInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
    accepted_at?: SortOrder
  }

  export type DonationsAvgOrderByAggregateInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
  }

  export type DonationsMaxOrderByAggregateInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
    accepted_at?: SortOrder
  }

  export type DonationsMinOrderByAggregateInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
    accepted_at?: SortOrder
  }

  export type DonationsSumOrderByAggregateInput = {
    donation_id?: SortOrder
    donation_request_id?: SortOrder
    created_by?: SortOrder
    accepted_by?: SortOrder
  }

  export type DonationsNullableScalarRelationFilter = {
    is?: DonationsWhereInput | null
    isNot?: DonationsWhereInput | null
  }

  export type DonationRequestCountOrderByAggregateInput = {
    donation_request_id?: SortOrder
    title?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    status?: SortOrder
    answered_by?: SortOrder
    created_by?: SortOrder
  }

  export type DonationRequestAvgOrderByAggregateInput = {
    donation_request_id?: SortOrder
    answered_by?: SortOrder
    created_by?: SortOrder
  }

  export type DonationRequestMaxOrderByAggregateInput = {
    donation_request_id?: SortOrder
    title?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    status?: SortOrder
    answered_by?: SortOrder
    created_by?: SortOrder
  }

  export type DonationRequestMinOrderByAggregateInput = {
    donation_request_id?: SortOrder
    title?: SortOrder
    created_on?: SortOrder
    updated_on?: SortOrder
    status?: SortOrder
    answered_by?: SortOrder
    created_by?: SortOrder
  }

  export type DonationRequestSumOrderByAggregateInput = {
    donation_request_id?: SortOrder
    answered_by?: SortOrder
    created_by?: SortOrder
  }

  export type ClothingItemsCountOrderByAggregateInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    type?: SortOrder
    size?: SortOrder
    condition?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrder
    owned_by?: SortOrder
    front_image_url?: SortOrder
    back_image_url?: SortOrder
  }

  export type ClothingItemsAvgOrderByAggregateInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrder
    owned_by?: SortOrder
  }

  export type ClothingItemsMaxOrderByAggregateInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    type?: SortOrder
    size?: SortOrder
    condition?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrder
    owned_by?: SortOrder
    front_image_url?: SortOrder
    back_image_url?: SortOrder
  }

  export type ClothingItemsMinOrderByAggregateInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    type?: SortOrder
    size?: SortOrder
    condition?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrder
    owned_by?: SortOrder
    front_image_url?: SortOrder
    back_image_url?: SortOrder
  }

  export type ClothingItemsSumOrderByAggregateInput = {
    clothing_id?: SortOrder
    donation_request_id?: SortOrder
    donor_id?: SortOrder
    donation_id?: SortOrder
    owned_by?: SortOrder
  }

  export type CharityApplicationsCreateNestedManyWithoutApproverInput = {
    create?: XOR<CharityApplicationsCreateWithoutApproverInput, CharityApplicationsUncheckedCreateWithoutApproverInput> | CharityApplicationsCreateWithoutApproverInput[] | CharityApplicationsUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutApproverInput | CharityApplicationsCreateOrConnectWithoutApproverInput[]
    createMany?: CharityApplicationsCreateManyApproverInputEnvelope
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
  }

  export type CharityApplicationsCreateNestedManyWithoutReviewerInput = {
    create?: XOR<CharityApplicationsCreateWithoutReviewerInput, CharityApplicationsUncheckedCreateWithoutReviewerInput> | CharityApplicationsCreateWithoutReviewerInput[] | CharityApplicationsUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutReviewerInput | CharityApplicationsCreateOrConnectWithoutReviewerInput[]
    createMany?: CharityApplicationsCreateManyReviewerInputEnvelope
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
  }

  export type CharitySignupTokensCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCreatorInput, CharitySignupTokensUncheckedCreateWithoutCreatorInput> | CharitySignupTokensCreateWithoutCreatorInput[] | CharitySignupTokensUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCreatorInput | CharitySignupTokensCreateOrConnectWithoutCreatorInput[]
    createMany?: CharitySignupTokensCreateManyCreatorInputEnvelope
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
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

  export type DonationRequestCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DonationRequestCreateWithoutCreatorInput, DonationRequestUncheckedCreateWithoutCreatorInput> | DonationRequestCreateWithoutCreatorInput[] | DonationRequestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutCreatorInput | DonationRequestCreateOrConnectWithoutCreatorInput[]
    createMany?: DonationRequestCreateManyCreatorInputEnvelope
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
  }

  export type DonationsCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DonationsCreateWithoutCreatorInput, DonationsUncheckedCreateWithoutCreatorInput> | DonationsCreateWithoutCreatorInput[] | DonationsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutCreatorInput | DonationsCreateOrConnectWithoutCreatorInput[]
    createMany?: DonationsCreateManyCreatorInputEnvelope
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
  }

  export type ClothingItemsCreateNestedManyWithoutDonorInput = {
    create?: XOR<ClothingItemsCreateWithoutDonorInput, ClothingItemsUncheckedCreateWithoutDonorInput> | ClothingItemsCreateWithoutDonorInput[] | ClothingItemsUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonorInput | ClothingItemsCreateOrConnectWithoutDonorInput[]
    createMany?: ClothingItemsCreateManyDonorInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<CharityApplicationsCreateWithoutApproverInput, CharityApplicationsUncheckedCreateWithoutApproverInput> | CharityApplicationsCreateWithoutApproverInput[] | CharityApplicationsUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutApproverInput | CharityApplicationsCreateOrConnectWithoutApproverInput[]
    createMany?: CharityApplicationsCreateManyApproverInputEnvelope
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
  }

  export type CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<CharityApplicationsCreateWithoutReviewerInput, CharityApplicationsUncheckedCreateWithoutReviewerInput> | CharityApplicationsCreateWithoutReviewerInput[] | CharityApplicationsUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutReviewerInput | CharityApplicationsCreateOrConnectWithoutReviewerInput[]
    createMany?: CharityApplicationsCreateManyReviewerInputEnvelope
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
  }

  export type CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCreatorInput, CharitySignupTokensUncheckedCreateWithoutCreatorInput> | CharitySignupTokensCreateWithoutCreatorInput[] | CharitySignupTokensUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCreatorInput | CharitySignupTokensCreateOrConnectWithoutCreatorInput[]
    createMany?: CharitySignupTokensCreateManyCreatorInputEnvelope
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
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

  export type DonationRequestUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DonationRequestCreateWithoutCreatorInput, DonationRequestUncheckedCreateWithoutCreatorInput> | DonationRequestCreateWithoutCreatorInput[] | DonationRequestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutCreatorInput | DonationRequestCreateOrConnectWithoutCreatorInput[]
    createMany?: DonationRequestCreateManyCreatorInputEnvelope
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
  }

  export type DonationsUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DonationsCreateWithoutCreatorInput, DonationsUncheckedCreateWithoutCreatorInput> | DonationsCreateWithoutCreatorInput[] | DonationsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutCreatorInput | DonationsCreateOrConnectWithoutCreatorInput[]
    createMany?: DonationsCreateManyCreatorInputEnvelope
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
  }

  export type ClothingItemsUncheckedCreateNestedManyWithoutDonorInput = {
    create?: XOR<ClothingItemsCreateWithoutDonorInput, ClothingItemsUncheckedCreateWithoutDonorInput> | ClothingItemsCreateWithoutDonorInput[] | ClothingItemsUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonorInput | ClothingItemsCreateOrConnectWithoutDonorInput[]
    createMany?: ClothingItemsCreateManyDonorInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
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

  export type CharityApplicationsUpdateManyWithoutApproverNestedInput = {
    create?: XOR<CharityApplicationsCreateWithoutApproverInput, CharityApplicationsUncheckedCreateWithoutApproverInput> | CharityApplicationsCreateWithoutApproverInput[] | CharityApplicationsUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutApproverInput | CharityApplicationsCreateOrConnectWithoutApproverInput[]
    upsert?: CharityApplicationsUpsertWithWhereUniqueWithoutApproverInput | CharityApplicationsUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: CharityApplicationsCreateManyApproverInputEnvelope
    set?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    disconnect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    delete?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    update?: CharityApplicationsUpdateWithWhereUniqueWithoutApproverInput | CharityApplicationsUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: CharityApplicationsUpdateManyWithWhereWithoutApproverInput | CharityApplicationsUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
  }

  export type CharityApplicationsUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<CharityApplicationsCreateWithoutReviewerInput, CharityApplicationsUncheckedCreateWithoutReviewerInput> | CharityApplicationsCreateWithoutReviewerInput[] | CharityApplicationsUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutReviewerInput | CharityApplicationsCreateOrConnectWithoutReviewerInput[]
    upsert?: CharityApplicationsUpsertWithWhereUniqueWithoutReviewerInput | CharityApplicationsUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: CharityApplicationsCreateManyReviewerInputEnvelope
    set?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    disconnect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    delete?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    update?: CharityApplicationsUpdateWithWhereUniqueWithoutReviewerInput | CharityApplicationsUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: CharityApplicationsUpdateManyWithWhereWithoutReviewerInput | CharityApplicationsUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
  }

  export type CharitySignupTokensUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCreatorInput, CharitySignupTokensUncheckedCreateWithoutCreatorInput> | CharitySignupTokensCreateWithoutCreatorInput[] | CharitySignupTokensUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCreatorInput | CharitySignupTokensCreateOrConnectWithoutCreatorInput[]
    upsert?: CharitySignupTokensUpsertWithWhereUniqueWithoutCreatorInput | CharitySignupTokensUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CharitySignupTokensCreateManyCreatorInputEnvelope
    set?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    disconnect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    delete?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    update?: CharitySignupTokensUpdateWithWhereUniqueWithoutCreatorInput | CharitySignupTokensUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CharitySignupTokensUpdateManyWithWhereWithoutCreatorInput | CharitySignupTokensUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CharitySignupTokensScalarWhereInput | CharitySignupTokensScalarWhereInput[]
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

  export type DonationRequestUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DonationRequestCreateWithoutCreatorInput, DonationRequestUncheckedCreateWithoutCreatorInput> | DonationRequestCreateWithoutCreatorInput[] | DonationRequestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutCreatorInput | DonationRequestCreateOrConnectWithoutCreatorInput[]
    upsert?: DonationRequestUpsertWithWhereUniqueWithoutCreatorInput | DonationRequestUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DonationRequestCreateManyCreatorInputEnvelope
    set?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    disconnect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    delete?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    update?: DonationRequestUpdateWithWhereUniqueWithoutCreatorInput | DonationRequestUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DonationRequestUpdateManyWithWhereWithoutCreatorInput | DonationRequestUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DonationRequestScalarWhereInput | DonationRequestScalarWhereInput[]
  }

  export type DonationsUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DonationsCreateWithoutCreatorInput, DonationsUncheckedCreateWithoutCreatorInput> | DonationsCreateWithoutCreatorInput[] | DonationsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutCreatorInput | DonationsCreateOrConnectWithoutCreatorInput[]
    upsert?: DonationsUpsertWithWhereUniqueWithoutCreatorInput | DonationsUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DonationsCreateManyCreatorInputEnvelope
    set?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    disconnect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    delete?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    update?: DonationsUpdateWithWhereUniqueWithoutCreatorInput | DonationsUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DonationsUpdateManyWithWhereWithoutCreatorInput | DonationsUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DonationsScalarWhereInput | DonationsScalarWhereInput[]
  }

  export type ClothingItemsUpdateManyWithoutDonorNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutDonorInput, ClothingItemsUncheckedCreateWithoutDonorInput> | ClothingItemsCreateWithoutDonorInput[] | ClothingItemsUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonorInput | ClothingItemsCreateOrConnectWithoutDonorInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutDonorInput | ClothingItemsUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: ClothingItemsCreateManyDonorInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutDonorInput | ClothingItemsUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutDonorInput | ClothingItemsUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<CharityApplicationsCreateWithoutApproverInput, CharityApplicationsUncheckedCreateWithoutApproverInput> | CharityApplicationsCreateWithoutApproverInput[] | CharityApplicationsUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutApproverInput | CharityApplicationsCreateOrConnectWithoutApproverInput[]
    upsert?: CharityApplicationsUpsertWithWhereUniqueWithoutApproverInput | CharityApplicationsUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: CharityApplicationsCreateManyApproverInputEnvelope
    set?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    disconnect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    delete?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    update?: CharityApplicationsUpdateWithWhereUniqueWithoutApproverInput | CharityApplicationsUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: CharityApplicationsUpdateManyWithWhereWithoutApproverInput | CharityApplicationsUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
  }

  export type CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<CharityApplicationsCreateWithoutReviewerInput, CharityApplicationsUncheckedCreateWithoutReviewerInput> | CharityApplicationsCreateWithoutReviewerInput[] | CharityApplicationsUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutReviewerInput | CharityApplicationsCreateOrConnectWithoutReviewerInput[]
    upsert?: CharityApplicationsUpsertWithWhereUniqueWithoutReviewerInput | CharityApplicationsUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: CharityApplicationsCreateManyReviewerInputEnvelope
    set?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    disconnect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    delete?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    update?: CharityApplicationsUpdateWithWhereUniqueWithoutReviewerInput | CharityApplicationsUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: CharityApplicationsUpdateManyWithWhereWithoutReviewerInput | CharityApplicationsUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
  }

  export type CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCreatorInput, CharitySignupTokensUncheckedCreateWithoutCreatorInput> | CharitySignupTokensCreateWithoutCreatorInput[] | CharitySignupTokensUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCreatorInput | CharitySignupTokensCreateOrConnectWithoutCreatorInput[]
    upsert?: CharitySignupTokensUpsertWithWhereUniqueWithoutCreatorInput | CharitySignupTokensUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CharitySignupTokensCreateManyCreatorInputEnvelope
    set?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    disconnect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    delete?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    update?: CharitySignupTokensUpdateWithWhereUniqueWithoutCreatorInput | CharitySignupTokensUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CharitySignupTokensUpdateManyWithWhereWithoutCreatorInput | CharitySignupTokensUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CharitySignupTokensScalarWhereInput | CharitySignupTokensScalarWhereInput[]
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

  export type DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DonationRequestCreateWithoutCreatorInput, DonationRequestUncheckedCreateWithoutCreatorInput> | DonationRequestCreateWithoutCreatorInput[] | DonationRequestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutCreatorInput | DonationRequestCreateOrConnectWithoutCreatorInput[]
    upsert?: DonationRequestUpsertWithWhereUniqueWithoutCreatorInput | DonationRequestUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DonationRequestCreateManyCreatorInputEnvelope
    set?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    disconnect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    delete?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    update?: DonationRequestUpdateWithWhereUniqueWithoutCreatorInput | DonationRequestUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DonationRequestUpdateManyWithWhereWithoutCreatorInput | DonationRequestUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DonationRequestScalarWhereInput | DonationRequestScalarWhereInput[]
  }

  export type DonationsUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DonationsCreateWithoutCreatorInput, DonationsUncheckedCreateWithoutCreatorInput> | DonationsCreateWithoutCreatorInput[] | DonationsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutCreatorInput | DonationsCreateOrConnectWithoutCreatorInput[]
    upsert?: DonationsUpsertWithWhereUniqueWithoutCreatorInput | DonationsUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DonationsCreateManyCreatorInputEnvelope
    set?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    disconnect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    delete?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    update?: DonationsUpdateWithWhereUniqueWithoutCreatorInput | DonationsUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DonationsUpdateManyWithWhereWithoutCreatorInput | DonationsUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DonationsScalarWhereInput | DonationsScalarWhereInput[]
  }

  export type ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutDonorInput, ClothingItemsUncheckedCreateWithoutDonorInput> | ClothingItemsCreateWithoutDonorInput[] | ClothingItemsUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonorInput | ClothingItemsCreateOrConnectWithoutDonorInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutDonorInput | ClothingItemsUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: ClothingItemsCreateManyDonorInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutDonorInput | ClothingItemsUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutDonorInput | ClothingItemsUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
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

  export type CharityApplicationsCreateNestedManyWithoutCharityInput = {
    create?: XOR<CharityApplicationsCreateWithoutCharityInput, CharityApplicationsUncheckedCreateWithoutCharityInput> | CharityApplicationsCreateWithoutCharityInput[] | CharityApplicationsUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutCharityInput | CharityApplicationsCreateOrConnectWithoutCharityInput[]
    createMany?: CharityApplicationsCreateManyCharityInputEnvelope
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
  }

  export type CharitySignupTokensCreateNestedManyWithoutCharityInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCharityInput, CharitySignupTokensUncheckedCreateWithoutCharityInput> | CharitySignupTokensCreateWithoutCharityInput[] | CharitySignupTokensUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCharityInput | CharitySignupTokensCreateOrConnectWithoutCharityInput[]
    createMany?: CharitySignupTokensCreateManyCharityInputEnvelope
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
  }

  export type DonationRequestCreateNestedManyWithoutAnswering_charityInput = {
    create?: XOR<DonationRequestCreateWithoutAnswering_charityInput, DonationRequestUncheckedCreateWithoutAnswering_charityInput> | DonationRequestCreateWithoutAnswering_charityInput[] | DonationRequestUncheckedCreateWithoutAnswering_charityInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutAnswering_charityInput | DonationRequestCreateOrConnectWithoutAnswering_charityInput[]
    createMany?: DonationRequestCreateManyAnswering_charityInputEnvelope
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
  }

  export type DonationsCreateNestedManyWithoutAcceptedInput = {
    create?: XOR<DonationsCreateWithoutAcceptedInput, DonationsUncheckedCreateWithoutAcceptedInput> | DonationsCreateWithoutAcceptedInput[] | DonationsUncheckedCreateWithoutAcceptedInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutAcceptedInput | DonationsCreateOrConnectWithoutAcceptedInput[]
    createMany?: DonationsCreateManyAcceptedInputEnvelope
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
  }

  export type ClothingItemsCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ClothingItemsCreateWithoutOwnerInput, ClothingItemsUncheckedCreateWithoutOwnerInput> | ClothingItemsCreateWithoutOwnerInput[] | ClothingItemsUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutOwnerInput | ClothingItemsCreateOrConnectWithoutOwnerInput[]
    createMany?: ClothingItemsCreateManyOwnerInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type CharityApplicationsUncheckedCreateNestedManyWithoutCharityInput = {
    create?: XOR<CharityApplicationsCreateWithoutCharityInput, CharityApplicationsUncheckedCreateWithoutCharityInput> | CharityApplicationsCreateWithoutCharityInput[] | CharityApplicationsUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutCharityInput | CharityApplicationsCreateOrConnectWithoutCharityInput[]
    createMany?: CharityApplicationsCreateManyCharityInputEnvelope
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
  }

  export type CharitySignupTokensUncheckedCreateNestedManyWithoutCharityInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCharityInput, CharitySignupTokensUncheckedCreateWithoutCharityInput> | CharitySignupTokensCreateWithoutCharityInput[] | CharitySignupTokensUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCharityInput | CharitySignupTokensCreateOrConnectWithoutCharityInput[]
    createMany?: CharitySignupTokensCreateManyCharityInputEnvelope
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
  }

  export type DonationRequestUncheckedCreateNestedManyWithoutAnswering_charityInput = {
    create?: XOR<DonationRequestCreateWithoutAnswering_charityInput, DonationRequestUncheckedCreateWithoutAnswering_charityInput> | DonationRequestCreateWithoutAnswering_charityInput[] | DonationRequestUncheckedCreateWithoutAnswering_charityInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutAnswering_charityInput | DonationRequestCreateOrConnectWithoutAnswering_charityInput[]
    createMany?: DonationRequestCreateManyAnswering_charityInputEnvelope
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
  }

  export type DonationsUncheckedCreateNestedManyWithoutAcceptedInput = {
    create?: XOR<DonationsCreateWithoutAcceptedInput, DonationsUncheckedCreateWithoutAcceptedInput> | DonationsCreateWithoutAcceptedInput[] | DonationsUncheckedCreateWithoutAcceptedInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutAcceptedInput | DonationsCreateOrConnectWithoutAcceptedInput[]
    createMany?: DonationsCreateManyAcceptedInputEnvelope
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
  }

  export type ClothingItemsUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ClothingItemsCreateWithoutOwnerInput, ClothingItemsUncheckedCreateWithoutOwnerInput> | ClothingItemsCreateWithoutOwnerInput[] | ClothingItemsUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutOwnerInput | ClothingItemsCreateOrConnectWithoutOwnerInput[]
    createMany?: ClothingItemsCreateManyOwnerInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CharityApplicationsUpdateManyWithoutCharityNestedInput = {
    create?: XOR<CharityApplicationsCreateWithoutCharityInput, CharityApplicationsUncheckedCreateWithoutCharityInput> | CharityApplicationsCreateWithoutCharityInput[] | CharityApplicationsUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutCharityInput | CharityApplicationsCreateOrConnectWithoutCharityInput[]
    upsert?: CharityApplicationsUpsertWithWhereUniqueWithoutCharityInput | CharityApplicationsUpsertWithWhereUniqueWithoutCharityInput[]
    createMany?: CharityApplicationsCreateManyCharityInputEnvelope
    set?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    disconnect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    delete?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    update?: CharityApplicationsUpdateWithWhereUniqueWithoutCharityInput | CharityApplicationsUpdateWithWhereUniqueWithoutCharityInput[]
    updateMany?: CharityApplicationsUpdateManyWithWhereWithoutCharityInput | CharityApplicationsUpdateManyWithWhereWithoutCharityInput[]
    deleteMany?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
  }

  export type CharitySignupTokensUpdateManyWithoutCharityNestedInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCharityInput, CharitySignupTokensUncheckedCreateWithoutCharityInput> | CharitySignupTokensCreateWithoutCharityInput[] | CharitySignupTokensUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCharityInput | CharitySignupTokensCreateOrConnectWithoutCharityInput[]
    upsert?: CharitySignupTokensUpsertWithWhereUniqueWithoutCharityInput | CharitySignupTokensUpsertWithWhereUniqueWithoutCharityInput[]
    createMany?: CharitySignupTokensCreateManyCharityInputEnvelope
    set?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    disconnect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    delete?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    update?: CharitySignupTokensUpdateWithWhereUniqueWithoutCharityInput | CharitySignupTokensUpdateWithWhereUniqueWithoutCharityInput[]
    updateMany?: CharitySignupTokensUpdateManyWithWhereWithoutCharityInput | CharitySignupTokensUpdateManyWithWhereWithoutCharityInput[]
    deleteMany?: CharitySignupTokensScalarWhereInput | CharitySignupTokensScalarWhereInput[]
  }

  export type DonationRequestUpdateManyWithoutAnswering_charityNestedInput = {
    create?: XOR<DonationRequestCreateWithoutAnswering_charityInput, DonationRequestUncheckedCreateWithoutAnswering_charityInput> | DonationRequestCreateWithoutAnswering_charityInput[] | DonationRequestUncheckedCreateWithoutAnswering_charityInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutAnswering_charityInput | DonationRequestCreateOrConnectWithoutAnswering_charityInput[]
    upsert?: DonationRequestUpsertWithWhereUniqueWithoutAnswering_charityInput | DonationRequestUpsertWithWhereUniqueWithoutAnswering_charityInput[]
    createMany?: DonationRequestCreateManyAnswering_charityInputEnvelope
    set?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    disconnect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    delete?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    update?: DonationRequestUpdateWithWhereUniqueWithoutAnswering_charityInput | DonationRequestUpdateWithWhereUniqueWithoutAnswering_charityInput[]
    updateMany?: DonationRequestUpdateManyWithWhereWithoutAnswering_charityInput | DonationRequestUpdateManyWithWhereWithoutAnswering_charityInput[]
    deleteMany?: DonationRequestScalarWhereInput | DonationRequestScalarWhereInput[]
  }

  export type DonationsUpdateManyWithoutAcceptedNestedInput = {
    create?: XOR<DonationsCreateWithoutAcceptedInput, DonationsUncheckedCreateWithoutAcceptedInput> | DonationsCreateWithoutAcceptedInput[] | DonationsUncheckedCreateWithoutAcceptedInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutAcceptedInput | DonationsCreateOrConnectWithoutAcceptedInput[]
    upsert?: DonationsUpsertWithWhereUniqueWithoutAcceptedInput | DonationsUpsertWithWhereUniqueWithoutAcceptedInput[]
    createMany?: DonationsCreateManyAcceptedInputEnvelope
    set?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    disconnect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    delete?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    update?: DonationsUpdateWithWhereUniqueWithoutAcceptedInput | DonationsUpdateWithWhereUniqueWithoutAcceptedInput[]
    updateMany?: DonationsUpdateManyWithWhereWithoutAcceptedInput | DonationsUpdateManyWithWhereWithoutAcceptedInput[]
    deleteMany?: DonationsScalarWhereInput | DonationsScalarWhereInput[]
  }

  export type ClothingItemsUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutOwnerInput, ClothingItemsUncheckedCreateWithoutOwnerInput> | ClothingItemsCreateWithoutOwnerInput[] | ClothingItemsUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutOwnerInput | ClothingItemsCreateOrConnectWithoutOwnerInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutOwnerInput | ClothingItemsUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ClothingItemsCreateManyOwnerInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutOwnerInput | ClothingItemsUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutOwnerInput | ClothingItemsUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type CharityApplicationsUncheckedUpdateManyWithoutCharityNestedInput = {
    create?: XOR<CharityApplicationsCreateWithoutCharityInput, CharityApplicationsUncheckedCreateWithoutCharityInput> | CharityApplicationsCreateWithoutCharityInput[] | CharityApplicationsUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharityApplicationsCreateOrConnectWithoutCharityInput | CharityApplicationsCreateOrConnectWithoutCharityInput[]
    upsert?: CharityApplicationsUpsertWithWhereUniqueWithoutCharityInput | CharityApplicationsUpsertWithWhereUniqueWithoutCharityInput[]
    createMany?: CharityApplicationsCreateManyCharityInputEnvelope
    set?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    disconnect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    delete?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    connect?: CharityApplicationsWhereUniqueInput | CharityApplicationsWhereUniqueInput[]
    update?: CharityApplicationsUpdateWithWhereUniqueWithoutCharityInput | CharityApplicationsUpdateWithWhereUniqueWithoutCharityInput[]
    updateMany?: CharityApplicationsUpdateManyWithWhereWithoutCharityInput | CharityApplicationsUpdateManyWithWhereWithoutCharityInput[]
    deleteMany?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
  }

  export type CharitySignupTokensUncheckedUpdateManyWithoutCharityNestedInput = {
    create?: XOR<CharitySignupTokensCreateWithoutCharityInput, CharitySignupTokensUncheckedCreateWithoutCharityInput> | CharitySignupTokensCreateWithoutCharityInput[] | CharitySignupTokensUncheckedCreateWithoutCharityInput[]
    connectOrCreate?: CharitySignupTokensCreateOrConnectWithoutCharityInput | CharitySignupTokensCreateOrConnectWithoutCharityInput[]
    upsert?: CharitySignupTokensUpsertWithWhereUniqueWithoutCharityInput | CharitySignupTokensUpsertWithWhereUniqueWithoutCharityInput[]
    createMany?: CharitySignupTokensCreateManyCharityInputEnvelope
    set?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    disconnect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    delete?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    connect?: CharitySignupTokensWhereUniqueInput | CharitySignupTokensWhereUniqueInput[]
    update?: CharitySignupTokensUpdateWithWhereUniqueWithoutCharityInput | CharitySignupTokensUpdateWithWhereUniqueWithoutCharityInput[]
    updateMany?: CharitySignupTokensUpdateManyWithWhereWithoutCharityInput | CharitySignupTokensUpdateManyWithWhereWithoutCharityInput[]
    deleteMany?: CharitySignupTokensScalarWhereInput | CharitySignupTokensScalarWhereInput[]
  }

  export type DonationRequestUncheckedUpdateManyWithoutAnswering_charityNestedInput = {
    create?: XOR<DonationRequestCreateWithoutAnswering_charityInput, DonationRequestUncheckedCreateWithoutAnswering_charityInput> | DonationRequestCreateWithoutAnswering_charityInput[] | DonationRequestUncheckedCreateWithoutAnswering_charityInput[]
    connectOrCreate?: DonationRequestCreateOrConnectWithoutAnswering_charityInput | DonationRequestCreateOrConnectWithoutAnswering_charityInput[]
    upsert?: DonationRequestUpsertWithWhereUniqueWithoutAnswering_charityInput | DonationRequestUpsertWithWhereUniqueWithoutAnswering_charityInput[]
    createMany?: DonationRequestCreateManyAnswering_charityInputEnvelope
    set?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    disconnect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    delete?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    connect?: DonationRequestWhereUniqueInput | DonationRequestWhereUniqueInput[]
    update?: DonationRequestUpdateWithWhereUniqueWithoutAnswering_charityInput | DonationRequestUpdateWithWhereUniqueWithoutAnswering_charityInput[]
    updateMany?: DonationRequestUpdateManyWithWhereWithoutAnswering_charityInput | DonationRequestUpdateManyWithWhereWithoutAnswering_charityInput[]
    deleteMany?: DonationRequestScalarWhereInput | DonationRequestScalarWhereInput[]
  }

  export type DonationsUncheckedUpdateManyWithoutAcceptedNestedInput = {
    create?: XOR<DonationsCreateWithoutAcceptedInput, DonationsUncheckedCreateWithoutAcceptedInput> | DonationsCreateWithoutAcceptedInput[] | DonationsUncheckedCreateWithoutAcceptedInput[]
    connectOrCreate?: DonationsCreateOrConnectWithoutAcceptedInput | DonationsCreateOrConnectWithoutAcceptedInput[]
    upsert?: DonationsUpsertWithWhereUniqueWithoutAcceptedInput | DonationsUpsertWithWhereUniqueWithoutAcceptedInput[]
    createMany?: DonationsCreateManyAcceptedInputEnvelope
    set?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    disconnect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    delete?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    connect?: DonationsWhereUniqueInput | DonationsWhereUniqueInput[]
    update?: DonationsUpdateWithWhereUniqueWithoutAcceptedInput | DonationsUpdateWithWhereUniqueWithoutAcceptedInput[]
    updateMany?: DonationsUpdateManyWithWhereWithoutAcceptedInput | DonationsUpdateManyWithWhereWithoutAcceptedInput[]
    deleteMany?: DonationsScalarWhereInput | DonationsScalarWhereInput[]
  }

  export type ClothingItemsUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutOwnerInput, ClothingItemsUncheckedCreateWithoutOwnerInput> | ClothingItemsCreateWithoutOwnerInput[] | ClothingItemsUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutOwnerInput | ClothingItemsCreateOrConnectWithoutOwnerInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutOwnerInput | ClothingItemsUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ClothingItemsCreateManyOwnerInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutOwnerInput | ClothingItemsUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutOwnerInput | ClothingItemsUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutApproved_applicationsInput = {
    create?: XOR<UserCreateWithoutApproved_applicationsInput, UserUncheckedCreateWithoutApproved_applicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApproved_applicationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewed_applicationsInput = {
    create?: XOR<UserCreateWithoutReviewed_applicationsInput, UserUncheckedCreateWithoutReviewed_applicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewed_applicationsInput
    connect?: UserWhereUniqueInput
  }

  export type CharitiesCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<CharitiesCreateWithoutApplicationsInput, CharitiesUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutApplicationsInput
    connect?: CharitiesWhereUniqueInput
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type UserUpdateOneWithoutApproved_applicationsNestedInput = {
    create?: XOR<UserCreateWithoutApproved_applicationsInput, UserUncheckedCreateWithoutApproved_applicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApproved_applicationsInput
    upsert?: UserUpsertWithoutApproved_applicationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApproved_applicationsInput, UserUpdateWithoutApproved_applicationsInput>, UserUncheckedUpdateWithoutApproved_applicationsInput>
  }

  export type UserUpdateOneWithoutReviewed_applicationsNestedInput = {
    create?: XOR<UserCreateWithoutReviewed_applicationsInput, UserUncheckedCreateWithoutReviewed_applicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewed_applicationsInput
    upsert?: UserUpsertWithoutReviewed_applicationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewed_applicationsInput, UserUpdateWithoutReviewed_applicationsInput>, UserUncheckedUpdateWithoutReviewed_applicationsInput>
  }

  export type CharitiesUpdateOneWithoutApplicationsNestedInput = {
    create?: XOR<CharitiesCreateWithoutApplicationsInput, CharitiesUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutApplicationsInput
    upsert?: CharitiesUpsertWithoutApplicationsInput
    disconnect?: CharitiesWhereInput | boolean
    delete?: CharitiesWhereInput | boolean
    connect?: CharitiesWhereUniqueInput
    update?: XOR<XOR<CharitiesUpdateToOneWithWhereWithoutApplicationsInput, CharitiesUpdateWithoutApplicationsInput>, CharitiesUncheckedUpdateWithoutApplicationsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CharitiesCreateNestedOneWithoutSignup_tokensInput = {
    create?: XOR<CharitiesCreateWithoutSignup_tokensInput, CharitiesUncheckedCreateWithoutSignup_tokensInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutSignup_tokensInput
    connect?: CharitiesWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreated_invitesInput = {
    create?: XOR<UserCreateWithoutCreated_invitesInput, UserUncheckedCreateWithoutCreated_invitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreated_invitesInput
    connect?: UserWhereUniqueInput
  }

  export type CharitiesUpdateOneRequiredWithoutSignup_tokensNestedInput = {
    create?: XOR<CharitiesCreateWithoutSignup_tokensInput, CharitiesUncheckedCreateWithoutSignup_tokensInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutSignup_tokensInput
    upsert?: CharitiesUpsertWithoutSignup_tokensInput
    connect?: CharitiesWhereUniqueInput
    update?: XOR<XOR<CharitiesUpdateToOneWithWhereWithoutSignup_tokensInput, CharitiesUpdateWithoutSignup_tokensInput>, CharitiesUncheckedUpdateWithoutSignup_tokensInput>
  }

  export type UserUpdateOneWithoutCreated_invitesNestedInput = {
    create?: XOR<UserCreateWithoutCreated_invitesInput, UserUncheckedCreateWithoutCreated_invitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreated_invitesInput
    upsert?: UserUpsertWithoutCreated_invitesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreated_invitesInput, UserUpdateWithoutCreated_invitesInput>, UserUncheckedUpdateWithoutCreated_invitesInput>
  }

  export type UserCreateNestedOneWithoutDonations_createdInput = {
    create?: XOR<UserCreateWithoutDonations_createdInput, UserUncheckedCreateWithoutDonations_createdInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonations_createdInput
    connect?: UserWhereUniqueInput
  }

  export type CharitiesCreateNestedOneWithoutDonations_receivedInput = {
    create?: XOR<CharitiesCreateWithoutDonations_receivedInput, CharitiesUncheckedCreateWithoutDonations_receivedInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutDonations_receivedInput
    connect?: CharitiesWhereUniqueInput
  }

  export type DonationRequestCreateNestedOneWithoutAccepted_donationInput = {
    create?: XOR<DonationRequestCreateWithoutAccepted_donationInput, DonationRequestUncheckedCreateWithoutAccepted_donationInput>
    connectOrCreate?: DonationRequestCreateOrConnectWithoutAccepted_donationInput
    connect?: DonationRequestWhereUniqueInput
  }

  export type ClothingItemsCreateNestedManyWithoutDonationInput = {
    create?: XOR<ClothingItemsCreateWithoutDonationInput, ClothingItemsUncheckedCreateWithoutDonationInput> | ClothingItemsCreateWithoutDonationInput[] | ClothingItemsUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonationInput | ClothingItemsCreateOrConnectWithoutDonationInput[]
    createMany?: ClothingItemsCreateManyDonationInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type ClothingItemsUncheckedCreateNestedManyWithoutDonationInput = {
    create?: XOR<ClothingItemsCreateWithoutDonationInput, ClothingItemsUncheckedCreateWithoutDonationInput> | ClothingItemsCreateWithoutDonationInput[] | ClothingItemsUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonationInput | ClothingItemsCreateOrConnectWithoutDonationInput[]
    createMany?: ClothingItemsCreateManyDonationInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDonations_createdNestedInput = {
    create?: XOR<UserCreateWithoutDonations_createdInput, UserUncheckedCreateWithoutDonations_createdInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonations_createdInput
    upsert?: UserUpsertWithoutDonations_createdInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDonations_createdInput, UserUpdateWithoutDonations_createdInput>, UserUncheckedUpdateWithoutDonations_createdInput>
  }

  export type CharitiesUpdateOneRequiredWithoutDonations_receivedNestedInput = {
    create?: XOR<CharitiesCreateWithoutDonations_receivedInput, CharitiesUncheckedCreateWithoutDonations_receivedInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutDonations_receivedInput
    upsert?: CharitiesUpsertWithoutDonations_receivedInput
    connect?: CharitiesWhereUniqueInput
    update?: XOR<XOR<CharitiesUpdateToOneWithWhereWithoutDonations_receivedInput, CharitiesUpdateWithoutDonations_receivedInput>, CharitiesUncheckedUpdateWithoutDonations_receivedInput>
  }

  export type DonationRequestUpdateOneRequiredWithoutAccepted_donationNestedInput = {
    create?: XOR<DonationRequestCreateWithoutAccepted_donationInput, DonationRequestUncheckedCreateWithoutAccepted_donationInput>
    connectOrCreate?: DonationRequestCreateOrConnectWithoutAccepted_donationInput
    upsert?: DonationRequestUpsertWithoutAccepted_donationInput
    connect?: DonationRequestWhereUniqueInput
    update?: XOR<XOR<DonationRequestUpdateToOneWithWhereWithoutAccepted_donationInput, DonationRequestUpdateWithoutAccepted_donationInput>, DonationRequestUncheckedUpdateWithoutAccepted_donationInput>
  }

  export type ClothingItemsUpdateManyWithoutDonationNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutDonationInput, ClothingItemsUncheckedCreateWithoutDonationInput> | ClothingItemsCreateWithoutDonationInput[] | ClothingItemsUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonationInput | ClothingItemsCreateOrConnectWithoutDonationInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutDonationInput | ClothingItemsUpsertWithWhereUniqueWithoutDonationInput[]
    createMany?: ClothingItemsCreateManyDonationInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutDonationInput | ClothingItemsUpdateWithWhereUniqueWithoutDonationInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutDonationInput | ClothingItemsUpdateManyWithWhereWithoutDonationInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type ClothingItemsUncheckedUpdateManyWithoutDonationNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutDonationInput, ClothingItemsUncheckedCreateWithoutDonationInput> | ClothingItemsCreateWithoutDonationInput[] | ClothingItemsUncheckedCreateWithoutDonationInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonationInput | ClothingItemsCreateOrConnectWithoutDonationInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutDonationInput | ClothingItemsUpsertWithWhereUniqueWithoutDonationInput[]
    createMany?: ClothingItemsCreateManyDonationInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutDonationInput | ClothingItemsUpdateWithWhereUniqueWithoutDonationInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutDonationInput | ClothingItemsUpdateManyWithWhereWithoutDonationInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type DonationsCreateNestedOneWithoutRequestInput = {
    create?: XOR<DonationsCreateWithoutRequestInput, DonationsUncheckedCreateWithoutRequestInput>
    connectOrCreate?: DonationsCreateOrConnectWithoutRequestInput
    connect?: DonationsWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDonation_requestsInput = {
    create?: XOR<UserCreateWithoutDonation_requestsInput, UserUncheckedCreateWithoutDonation_requestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonation_requestsInput
    connect?: UserWhereUniqueInput
  }

  export type CharitiesCreateNestedOneWithoutDonation_requests_answeredInput = {
    create?: XOR<CharitiesCreateWithoutDonation_requests_answeredInput, CharitiesUncheckedCreateWithoutDonation_requests_answeredInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutDonation_requests_answeredInput
    connect?: CharitiesWhereUniqueInput
  }

  export type ClothingItemsCreateNestedManyWithoutDonation_requestInput = {
    create?: XOR<ClothingItemsCreateWithoutDonation_requestInput, ClothingItemsUncheckedCreateWithoutDonation_requestInput> | ClothingItemsCreateWithoutDonation_requestInput[] | ClothingItemsUncheckedCreateWithoutDonation_requestInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonation_requestInput | ClothingItemsCreateOrConnectWithoutDonation_requestInput[]
    createMany?: ClothingItemsCreateManyDonation_requestInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type DonationsUncheckedCreateNestedOneWithoutRequestInput = {
    create?: XOR<DonationsCreateWithoutRequestInput, DonationsUncheckedCreateWithoutRequestInput>
    connectOrCreate?: DonationsCreateOrConnectWithoutRequestInput
    connect?: DonationsWhereUniqueInput
  }

  export type ClothingItemsUncheckedCreateNestedManyWithoutDonation_requestInput = {
    create?: XOR<ClothingItemsCreateWithoutDonation_requestInput, ClothingItemsUncheckedCreateWithoutDonation_requestInput> | ClothingItemsCreateWithoutDonation_requestInput[] | ClothingItemsUncheckedCreateWithoutDonation_requestInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonation_requestInput | ClothingItemsCreateOrConnectWithoutDonation_requestInput[]
    createMany?: ClothingItemsCreateManyDonation_requestInputEnvelope
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
  }

  export type DonationsUpdateOneWithoutRequestNestedInput = {
    create?: XOR<DonationsCreateWithoutRequestInput, DonationsUncheckedCreateWithoutRequestInput>
    connectOrCreate?: DonationsCreateOrConnectWithoutRequestInput
    upsert?: DonationsUpsertWithoutRequestInput
    disconnect?: DonationsWhereInput | boolean
    delete?: DonationsWhereInput | boolean
    connect?: DonationsWhereUniqueInput
    update?: XOR<XOR<DonationsUpdateToOneWithWhereWithoutRequestInput, DonationsUpdateWithoutRequestInput>, DonationsUncheckedUpdateWithoutRequestInput>
  }

  export type UserUpdateOneRequiredWithoutDonation_requestsNestedInput = {
    create?: XOR<UserCreateWithoutDonation_requestsInput, UserUncheckedCreateWithoutDonation_requestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonation_requestsInput
    upsert?: UserUpsertWithoutDonation_requestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDonation_requestsInput, UserUpdateWithoutDonation_requestsInput>, UserUncheckedUpdateWithoutDonation_requestsInput>
  }

  export type CharitiesUpdateOneWithoutDonation_requests_answeredNestedInput = {
    create?: XOR<CharitiesCreateWithoutDonation_requests_answeredInput, CharitiesUncheckedCreateWithoutDonation_requests_answeredInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutDonation_requests_answeredInput
    upsert?: CharitiesUpsertWithoutDonation_requests_answeredInput
    disconnect?: CharitiesWhereInput | boolean
    delete?: CharitiesWhereInput | boolean
    connect?: CharitiesWhereUniqueInput
    update?: XOR<XOR<CharitiesUpdateToOneWithWhereWithoutDonation_requests_answeredInput, CharitiesUpdateWithoutDonation_requests_answeredInput>, CharitiesUncheckedUpdateWithoutDonation_requests_answeredInput>
  }

  export type ClothingItemsUpdateManyWithoutDonation_requestNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutDonation_requestInput, ClothingItemsUncheckedCreateWithoutDonation_requestInput> | ClothingItemsCreateWithoutDonation_requestInput[] | ClothingItemsUncheckedCreateWithoutDonation_requestInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonation_requestInput | ClothingItemsCreateOrConnectWithoutDonation_requestInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutDonation_requestInput | ClothingItemsUpsertWithWhereUniqueWithoutDonation_requestInput[]
    createMany?: ClothingItemsCreateManyDonation_requestInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutDonation_requestInput | ClothingItemsUpdateWithWhereUniqueWithoutDonation_requestInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutDonation_requestInput | ClothingItemsUpdateManyWithWhereWithoutDonation_requestInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type DonationsUncheckedUpdateOneWithoutRequestNestedInput = {
    create?: XOR<DonationsCreateWithoutRequestInput, DonationsUncheckedCreateWithoutRequestInput>
    connectOrCreate?: DonationsCreateOrConnectWithoutRequestInput
    upsert?: DonationsUpsertWithoutRequestInput
    disconnect?: DonationsWhereInput | boolean
    delete?: DonationsWhereInput | boolean
    connect?: DonationsWhereUniqueInput
    update?: XOR<XOR<DonationsUpdateToOneWithWhereWithoutRequestInput, DonationsUpdateWithoutRequestInput>, DonationsUncheckedUpdateWithoutRequestInput>
  }

  export type ClothingItemsUncheckedUpdateManyWithoutDonation_requestNestedInput = {
    create?: XOR<ClothingItemsCreateWithoutDonation_requestInput, ClothingItemsUncheckedCreateWithoutDonation_requestInput> | ClothingItemsCreateWithoutDonation_requestInput[] | ClothingItemsUncheckedCreateWithoutDonation_requestInput[]
    connectOrCreate?: ClothingItemsCreateOrConnectWithoutDonation_requestInput | ClothingItemsCreateOrConnectWithoutDonation_requestInput[]
    upsert?: ClothingItemsUpsertWithWhereUniqueWithoutDonation_requestInput | ClothingItemsUpsertWithWhereUniqueWithoutDonation_requestInput[]
    createMany?: ClothingItemsCreateManyDonation_requestInputEnvelope
    set?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    disconnect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    delete?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    connect?: ClothingItemsWhereUniqueInput | ClothingItemsWhereUniqueInput[]
    update?: ClothingItemsUpdateWithWhereUniqueWithoutDonation_requestInput | ClothingItemsUpdateWithWhereUniqueWithoutDonation_requestInput[]
    updateMany?: ClothingItemsUpdateManyWithWhereWithoutDonation_requestInput | ClothingItemsUpdateManyWithWhereWithoutDonation_requestInput[]
    deleteMany?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
  }

  export type DonationRequestCreateNestedOneWithoutClothingItemsInput = {
    create?: XOR<DonationRequestCreateWithoutClothingItemsInput, DonationRequestUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: DonationRequestCreateOrConnectWithoutClothingItemsInput
    connect?: DonationRequestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClothingItemsInput = {
    create?: XOR<UserCreateWithoutClothingItemsInput, UserUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClothingItemsInput
    connect?: UserWhereUniqueInput
  }

  export type CharitiesCreateNestedOneWithoutClothingItemsInput = {
    create?: XOR<CharitiesCreateWithoutClothingItemsInput, CharitiesUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutClothingItemsInput
    connect?: CharitiesWhereUniqueInput
  }

  export type DonationsCreateNestedOneWithoutClothingItemsInput = {
    create?: XOR<DonationsCreateWithoutClothingItemsInput, DonationsUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: DonationsCreateOrConnectWithoutClothingItemsInput
    connect?: DonationsWhereUniqueInput
  }

  export type DonationRequestUpdateOneRequiredWithoutClothingItemsNestedInput = {
    create?: XOR<DonationRequestCreateWithoutClothingItemsInput, DonationRequestUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: DonationRequestCreateOrConnectWithoutClothingItemsInput
    upsert?: DonationRequestUpsertWithoutClothingItemsInput
    connect?: DonationRequestWhereUniqueInput
    update?: XOR<XOR<DonationRequestUpdateToOneWithWhereWithoutClothingItemsInput, DonationRequestUpdateWithoutClothingItemsInput>, DonationRequestUncheckedUpdateWithoutClothingItemsInput>
  }

  export type UserUpdateOneRequiredWithoutClothingItemsNestedInput = {
    create?: XOR<UserCreateWithoutClothingItemsInput, UserUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClothingItemsInput
    upsert?: UserUpsertWithoutClothingItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClothingItemsInput, UserUpdateWithoutClothingItemsInput>, UserUncheckedUpdateWithoutClothingItemsInput>
  }

  export type CharitiesUpdateOneWithoutClothingItemsNestedInput = {
    create?: XOR<CharitiesCreateWithoutClothingItemsInput, CharitiesUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: CharitiesCreateOrConnectWithoutClothingItemsInput
    upsert?: CharitiesUpsertWithoutClothingItemsInput
    disconnect?: CharitiesWhereInput | boolean
    delete?: CharitiesWhereInput | boolean
    connect?: CharitiesWhereUniqueInput
    update?: XOR<XOR<CharitiesUpdateToOneWithWhereWithoutClothingItemsInput, CharitiesUpdateWithoutClothingItemsInput>, CharitiesUncheckedUpdateWithoutClothingItemsInput>
  }

  export type DonationsUpdateOneWithoutClothingItemsNestedInput = {
    create?: XOR<DonationsCreateWithoutClothingItemsInput, DonationsUncheckedCreateWithoutClothingItemsInput>
    connectOrCreate?: DonationsCreateOrConnectWithoutClothingItemsInput
    upsert?: DonationsUpsertWithoutClothingItemsInput
    disconnect?: DonationsWhereInput | boolean
    delete?: DonationsWhereInput | boolean
    connect?: DonationsWhereUniqueInput
    update?: XOR<XOR<DonationsUpdateToOneWithWhereWithoutClothingItemsInput, DonationsUpdateWithoutClothingItemsInput>, DonationsUncheckedUpdateWithoutClothingItemsInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CharityApplicationsCreateWithoutApproverInput = {
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    approved_on?: Date | string | null
    created_on?: Date | string
    updated_on?: Date | string
    reviewer?: UserCreateNestedOneWithoutReviewed_applicationsInput
    charity?: CharitiesCreateNestedOneWithoutApplicationsInput
  }

  export type CharityApplicationsUncheckedCreateWithoutApproverInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    reviewed_by?: number | null
    approved_on?: Date | string | null
    charity_id?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharityApplicationsCreateOrConnectWithoutApproverInput = {
    where: CharityApplicationsWhereUniqueInput
    create: XOR<CharityApplicationsCreateWithoutApproverInput, CharityApplicationsUncheckedCreateWithoutApproverInput>
  }

  export type CharityApplicationsCreateManyApproverInputEnvelope = {
    data: CharityApplicationsCreateManyApproverInput | CharityApplicationsCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type CharityApplicationsCreateWithoutReviewerInput = {
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    approved_on?: Date | string | null
    created_on?: Date | string
    updated_on?: Date | string
    approver?: UserCreateNestedOneWithoutApproved_applicationsInput
    charity?: CharitiesCreateNestedOneWithoutApplicationsInput
  }

  export type CharityApplicationsUncheckedCreateWithoutReviewerInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    approved_on?: Date | string | null
    approved_by?: number | null
    charity_id?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharityApplicationsCreateOrConnectWithoutReviewerInput = {
    where: CharityApplicationsWhereUniqueInput
    create: XOR<CharityApplicationsCreateWithoutReviewerInput, CharityApplicationsUncheckedCreateWithoutReviewerInput>
  }

  export type CharityApplicationsCreateManyReviewerInputEnvelope = {
    data: CharityApplicationsCreateManyReviewerInput | CharityApplicationsCreateManyReviewerInput[]
    skipDuplicates?: boolean
  }

  export type CharitySignupTokensCreateWithoutCreatorInput = {
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    charity: CharitiesCreateNestedOneWithoutSignup_tokensInput
  }

  export type CharitySignupTokensUncheckedCreateWithoutCreatorInput = {
    invite_id?: number
    charity_id: number
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
  }

  export type CharitySignupTokensCreateOrConnectWithoutCreatorInput = {
    where: CharitySignupTokensWhereUniqueInput
    create: XOR<CharitySignupTokensCreateWithoutCreatorInput, CharitySignupTokensUncheckedCreateWithoutCreatorInput>
  }

  export type CharitySignupTokensCreateManyCreatorInputEnvelope = {
    data: CharitySignupTokensCreateManyCreatorInput | CharitySignupTokensCreateManyCreatorInput[]
    skipDuplicates?: boolean
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

  export type DonationRequestCreateWithoutCreatorInput = {
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    accepted_donation?: DonationsCreateNestedOneWithoutRequestInput
    answering_charity?: CharitiesCreateNestedOneWithoutDonation_requests_answeredInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestUncheckedCreateWithoutCreatorInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    answered_by?: number | null
    accepted_donation?: DonationsUncheckedCreateNestedOneWithoutRequestInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestCreateOrConnectWithoutCreatorInput = {
    where: DonationRequestWhereUniqueInput
    create: XOR<DonationRequestCreateWithoutCreatorInput, DonationRequestUncheckedCreateWithoutCreatorInput>
  }

  export type DonationRequestCreateManyCreatorInputEnvelope = {
    data: DonationRequestCreateManyCreatorInput | DonationRequestCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type DonationsCreateWithoutCreatorInput = {
    accepted_at?: Date | string
    accepted: CharitiesCreateNestedOneWithoutDonations_receivedInput
    request: DonationRequestCreateNestedOneWithoutAccepted_donationInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonationInput
  }

  export type DonationsUncheckedCreateWithoutCreatorInput = {
    donation_id?: number
    donation_request_id: number
    accepted_by: number
    accepted_at?: Date | string
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationsCreateOrConnectWithoutCreatorInput = {
    where: DonationsWhereUniqueInput
    create: XOR<DonationsCreateWithoutCreatorInput, DonationsUncheckedCreateWithoutCreatorInput>
  }

  export type DonationsCreateManyCreatorInputEnvelope = {
    data: DonationsCreateManyCreatorInput | DonationsCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ClothingItemsCreateWithoutDonorInput = {
    type: string
    size: string
    condition: string
    front_image_url: string
    back_image_url: string
    donation_request: DonationRequestCreateNestedOneWithoutClothingItemsInput
    owner?: CharitiesCreateNestedOneWithoutClothingItemsInput
    donation?: DonationsCreateNestedOneWithoutClothingItemsInput
  }

  export type ClothingItemsUncheckedCreateWithoutDonorInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donation_id?: number | null
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsCreateOrConnectWithoutDonorInput = {
    where: ClothingItemsWhereUniqueInput
    create: XOR<ClothingItemsCreateWithoutDonorInput, ClothingItemsUncheckedCreateWithoutDonorInput>
  }

  export type ClothingItemsCreateManyDonorInputEnvelope = {
    data: ClothingItemsCreateManyDonorInput | ClothingItemsCreateManyDonorInput[]
    skipDuplicates?: boolean
  }

  export type CharityApplicationsUpsertWithWhereUniqueWithoutApproverInput = {
    where: CharityApplicationsWhereUniqueInput
    update: XOR<CharityApplicationsUpdateWithoutApproverInput, CharityApplicationsUncheckedUpdateWithoutApproverInput>
    create: XOR<CharityApplicationsCreateWithoutApproverInput, CharityApplicationsUncheckedCreateWithoutApproverInput>
  }

  export type CharityApplicationsUpdateWithWhereUniqueWithoutApproverInput = {
    where: CharityApplicationsWhereUniqueInput
    data: XOR<CharityApplicationsUpdateWithoutApproverInput, CharityApplicationsUncheckedUpdateWithoutApproverInput>
  }

  export type CharityApplicationsUpdateManyWithWhereWithoutApproverInput = {
    where: CharityApplicationsScalarWhereInput
    data: XOR<CharityApplicationsUpdateManyMutationInput, CharityApplicationsUncheckedUpdateManyWithoutApproverInput>
  }

  export type CharityApplicationsScalarWhereInput = {
    AND?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
    OR?: CharityApplicationsScalarWhereInput[]
    NOT?: CharityApplicationsScalarWhereInput | CharityApplicationsScalarWhereInput[]
    application_id?: IntFilter<"CharityApplications"> | number
    org_name?: StringFilter<"CharityApplications"> | string
    contact_name?: StringFilter<"CharityApplications"> | string
    contact_email?: StringFilter<"CharityApplications"> | string
    contact_number?: StringFilter<"CharityApplications"> | string
    website?: StringFilter<"CharityApplications"> | string
    org_address?: StringFilter<"CharityApplications"> | string
    charity_number?: StringNullableFilter<"CharityApplications"> | string | null
    status?: EnumStatusFilter<"CharityApplications"> | $Enums.Status
    reviewed_on?: DateTimeNullableFilter<"CharityApplications"> | Date | string | null
    reviewed_by?: IntNullableFilter<"CharityApplications"> | number | null
    approved_on?: DateTimeNullableFilter<"CharityApplications"> | Date | string | null
    approved_by?: IntNullableFilter<"CharityApplications"> | number | null
    charity_id?: IntNullableFilter<"CharityApplications"> | number | null
    created_on?: DateTimeFilter<"CharityApplications"> | Date | string
    updated_on?: DateTimeFilter<"CharityApplications"> | Date | string
  }

  export type CharityApplicationsUpsertWithWhereUniqueWithoutReviewerInput = {
    where: CharityApplicationsWhereUniqueInput
    update: XOR<CharityApplicationsUpdateWithoutReviewerInput, CharityApplicationsUncheckedUpdateWithoutReviewerInput>
    create: XOR<CharityApplicationsCreateWithoutReviewerInput, CharityApplicationsUncheckedCreateWithoutReviewerInput>
  }

  export type CharityApplicationsUpdateWithWhereUniqueWithoutReviewerInput = {
    where: CharityApplicationsWhereUniqueInput
    data: XOR<CharityApplicationsUpdateWithoutReviewerInput, CharityApplicationsUncheckedUpdateWithoutReviewerInput>
  }

  export type CharityApplicationsUpdateManyWithWhereWithoutReviewerInput = {
    where: CharityApplicationsScalarWhereInput
    data: XOR<CharityApplicationsUpdateManyMutationInput, CharityApplicationsUncheckedUpdateManyWithoutReviewerInput>
  }

  export type CharitySignupTokensUpsertWithWhereUniqueWithoutCreatorInput = {
    where: CharitySignupTokensWhereUniqueInput
    update: XOR<CharitySignupTokensUpdateWithoutCreatorInput, CharitySignupTokensUncheckedUpdateWithoutCreatorInput>
    create: XOR<CharitySignupTokensCreateWithoutCreatorInput, CharitySignupTokensUncheckedCreateWithoutCreatorInput>
  }

  export type CharitySignupTokensUpdateWithWhereUniqueWithoutCreatorInput = {
    where: CharitySignupTokensWhereUniqueInput
    data: XOR<CharitySignupTokensUpdateWithoutCreatorInput, CharitySignupTokensUncheckedUpdateWithoutCreatorInput>
  }

  export type CharitySignupTokensUpdateManyWithWhereWithoutCreatorInput = {
    where: CharitySignupTokensScalarWhereInput
    data: XOR<CharitySignupTokensUpdateManyMutationInput, CharitySignupTokensUncheckedUpdateManyWithoutCreatorInput>
  }

  export type CharitySignupTokensScalarWhereInput = {
    AND?: CharitySignupTokensScalarWhereInput | CharitySignupTokensScalarWhereInput[]
    OR?: CharitySignupTokensScalarWhereInput[]
    NOT?: CharitySignupTokensScalarWhereInput | CharitySignupTokensScalarWhereInput[]
    invite_id?: IntFilter<"CharitySignupTokens"> | number
    charity_id?: IntFilter<"CharitySignupTokens"> | number
    email?: StringFilter<"CharitySignupTokens"> | string
    token?: StringFilter<"CharitySignupTokens"> | string
    expires_on?: DateTimeFilter<"CharitySignupTokens"> | Date | string
    consumed_on?: DateTimeNullableFilter<"CharitySignupTokens"> | Date | string | null
    created_on?: DateTimeFilter<"CharitySignupTokens"> | Date | string
    created_by?: IntNullableFilter<"CharitySignupTokens"> | number | null
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

  export type DonationRequestUpsertWithWhereUniqueWithoutCreatorInput = {
    where: DonationRequestWhereUniqueInput
    update: XOR<DonationRequestUpdateWithoutCreatorInput, DonationRequestUncheckedUpdateWithoutCreatorInput>
    create: XOR<DonationRequestCreateWithoutCreatorInput, DonationRequestUncheckedCreateWithoutCreatorInput>
  }

  export type DonationRequestUpdateWithWhereUniqueWithoutCreatorInput = {
    where: DonationRequestWhereUniqueInput
    data: XOR<DonationRequestUpdateWithoutCreatorInput, DonationRequestUncheckedUpdateWithoutCreatorInput>
  }

  export type DonationRequestUpdateManyWithWhereWithoutCreatorInput = {
    where: DonationRequestScalarWhereInput
    data: XOR<DonationRequestUpdateManyMutationInput, DonationRequestUncheckedUpdateManyWithoutCreatorInput>
  }

  export type DonationRequestScalarWhereInput = {
    AND?: DonationRequestScalarWhereInput | DonationRequestScalarWhereInput[]
    OR?: DonationRequestScalarWhereInput[]
    NOT?: DonationRequestScalarWhereInput | DonationRequestScalarWhereInput[]
    donation_request_id?: IntFilter<"DonationRequest"> | number
    title?: StringFilter<"DonationRequest"> | string
    created_on?: DateTimeFilter<"DonationRequest"> | Date | string
    updated_on?: DateTimeFilter<"DonationRequest"> | Date | string
    status?: EnumStatusFilter<"DonationRequest"> | $Enums.Status
    answered_by?: IntNullableFilter<"DonationRequest"> | number | null
    created_by?: IntFilter<"DonationRequest"> | number
  }

  export type DonationsUpsertWithWhereUniqueWithoutCreatorInput = {
    where: DonationsWhereUniqueInput
    update: XOR<DonationsUpdateWithoutCreatorInput, DonationsUncheckedUpdateWithoutCreatorInput>
    create: XOR<DonationsCreateWithoutCreatorInput, DonationsUncheckedCreateWithoutCreatorInput>
  }

  export type DonationsUpdateWithWhereUniqueWithoutCreatorInput = {
    where: DonationsWhereUniqueInput
    data: XOR<DonationsUpdateWithoutCreatorInput, DonationsUncheckedUpdateWithoutCreatorInput>
  }

  export type DonationsUpdateManyWithWhereWithoutCreatorInput = {
    where: DonationsScalarWhereInput
    data: XOR<DonationsUpdateManyMutationInput, DonationsUncheckedUpdateManyWithoutCreatorInput>
  }

  export type DonationsScalarWhereInput = {
    AND?: DonationsScalarWhereInput | DonationsScalarWhereInput[]
    OR?: DonationsScalarWhereInput[]
    NOT?: DonationsScalarWhereInput | DonationsScalarWhereInput[]
    donation_id?: IntFilter<"Donations"> | number
    donation_request_id?: IntFilter<"Donations"> | number
    created_by?: IntFilter<"Donations"> | number
    accepted_by?: IntFilter<"Donations"> | number
    accepted_at?: DateTimeFilter<"Donations"> | Date | string
  }

  export type ClothingItemsUpsertWithWhereUniqueWithoutDonorInput = {
    where: ClothingItemsWhereUniqueInput
    update: XOR<ClothingItemsUpdateWithoutDonorInput, ClothingItemsUncheckedUpdateWithoutDonorInput>
    create: XOR<ClothingItemsCreateWithoutDonorInput, ClothingItemsUncheckedCreateWithoutDonorInput>
  }

  export type ClothingItemsUpdateWithWhereUniqueWithoutDonorInput = {
    where: ClothingItemsWhereUniqueInput
    data: XOR<ClothingItemsUpdateWithoutDonorInput, ClothingItemsUncheckedUpdateWithoutDonorInput>
  }

  export type ClothingItemsUpdateManyWithWhereWithoutDonorInput = {
    where: ClothingItemsScalarWhereInput
    data: XOR<ClothingItemsUpdateManyMutationInput, ClothingItemsUncheckedUpdateManyWithoutDonorInput>
  }

  export type ClothingItemsScalarWhereInput = {
    AND?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
    OR?: ClothingItemsScalarWhereInput[]
    NOT?: ClothingItemsScalarWhereInput | ClothingItemsScalarWhereInput[]
    clothing_id?: IntFilter<"ClothingItems"> | number
    donation_request_id?: IntFilter<"ClothingItems"> | number
    type?: StringFilter<"ClothingItems"> | string
    size?: StringFilter<"ClothingItems"> | string
    condition?: StringFilter<"ClothingItems"> | string
    donor_id?: IntFilter<"ClothingItems"> | number
    donation_id?: IntNullableFilter<"ClothingItems"> | number | null
    owned_by?: IntNullableFilter<"ClothingItems"> | number | null
    front_image_url?: StringFilter<"ClothingItems"> | string
    back_image_url?: StringFilter<"ClothingItems"> | string
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
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
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
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
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
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
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
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
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
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
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
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
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
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
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
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type CharityApplicationsCreateWithoutCharityInput = {
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    approved_on?: Date | string | null
    created_on?: Date | string
    updated_on?: Date | string
    approver?: UserCreateNestedOneWithoutApproved_applicationsInput
    reviewer?: UserCreateNestedOneWithoutReviewed_applicationsInput
  }

  export type CharityApplicationsUncheckedCreateWithoutCharityInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    reviewed_by?: number | null
    approved_on?: Date | string | null
    approved_by?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharityApplicationsCreateOrConnectWithoutCharityInput = {
    where: CharityApplicationsWhereUniqueInput
    create: XOR<CharityApplicationsCreateWithoutCharityInput, CharityApplicationsUncheckedCreateWithoutCharityInput>
  }

  export type CharityApplicationsCreateManyCharityInputEnvelope = {
    data: CharityApplicationsCreateManyCharityInput | CharityApplicationsCreateManyCharityInput[]
    skipDuplicates?: boolean
  }

  export type CharitySignupTokensCreateWithoutCharityInput = {
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    creator?: UserCreateNestedOneWithoutCreated_invitesInput
  }

  export type CharitySignupTokensUncheckedCreateWithoutCharityInput = {
    invite_id?: number
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    created_by?: number | null
  }

  export type CharitySignupTokensCreateOrConnectWithoutCharityInput = {
    where: CharitySignupTokensWhereUniqueInput
    create: XOR<CharitySignupTokensCreateWithoutCharityInput, CharitySignupTokensUncheckedCreateWithoutCharityInput>
  }

  export type CharitySignupTokensCreateManyCharityInputEnvelope = {
    data: CharitySignupTokensCreateManyCharityInput | CharitySignupTokensCreateManyCharityInput[]
    skipDuplicates?: boolean
  }

  export type DonationRequestCreateWithoutAnswering_charityInput = {
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    accepted_donation?: DonationsCreateNestedOneWithoutRequestInput
    creator: UserCreateNestedOneWithoutDonation_requestsInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestUncheckedCreateWithoutAnswering_charityInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    created_by: number
    accepted_donation?: DonationsUncheckedCreateNestedOneWithoutRequestInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestCreateOrConnectWithoutAnswering_charityInput = {
    where: DonationRequestWhereUniqueInput
    create: XOR<DonationRequestCreateWithoutAnswering_charityInput, DonationRequestUncheckedCreateWithoutAnswering_charityInput>
  }

  export type DonationRequestCreateManyAnswering_charityInputEnvelope = {
    data: DonationRequestCreateManyAnswering_charityInput | DonationRequestCreateManyAnswering_charityInput[]
    skipDuplicates?: boolean
  }

  export type DonationsCreateWithoutAcceptedInput = {
    accepted_at?: Date | string
    creator: UserCreateNestedOneWithoutDonations_createdInput
    request: DonationRequestCreateNestedOneWithoutAccepted_donationInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonationInput
  }

  export type DonationsUncheckedCreateWithoutAcceptedInput = {
    donation_id?: number
    donation_request_id: number
    created_by: number
    accepted_at?: Date | string
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationsCreateOrConnectWithoutAcceptedInput = {
    where: DonationsWhereUniqueInput
    create: XOR<DonationsCreateWithoutAcceptedInput, DonationsUncheckedCreateWithoutAcceptedInput>
  }

  export type DonationsCreateManyAcceptedInputEnvelope = {
    data: DonationsCreateManyAcceptedInput | DonationsCreateManyAcceptedInput[]
    skipDuplicates?: boolean
  }

  export type ClothingItemsCreateWithoutOwnerInput = {
    type: string
    size: string
    condition: string
    front_image_url: string
    back_image_url: string
    donation_request: DonationRequestCreateNestedOneWithoutClothingItemsInput
    donor: UserCreateNestedOneWithoutClothingItemsInput
    donation?: DonationsCreateNestedOneWithoutClothingItemsInput
  }

  export type ClothingItemsUncheckedCreateWithoutOwnerInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsCreateOrConnectWithoutOwnerInput = {
    where: ClothingItemsWhereUniqueInput
    create: XOR<ClothingItemsCreateWithoutOwnerInput, ClothingItemsUncheckedCreateWithoutOwnerInput>
  }

  export type ClothingItemsCreateManyOwnerInputEnvelope = {
    data: ClothingItemsCreateManyOwnerInput | ClothingItemsCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type CharityApplicationsUpsertWithWhereUniqueWithoutCharityInput = {
    where: CharityApplicationsWhereUniqueInput
    update: XOR<CharityApplicationsUpdateWithoutCharityInput, CharityApplicationsUncheckedUpdateWithoutCharityInput>
    create: XOR<CharityApplicationsCreateWithoutCharityInput, CharityApplicationsUncheckedCreateWithoutCharityInput>
  }

  export type CharityApplicationsUpdateWithWhereUniqueWithoutCharityInput = {
    where: CharityApplicationsWhereUniqueInput
    data: XOR<CharityApplicationsUpdateWithoutCharityInput, CharityApplicationsUncheckedUpdateWithoutCharityInput>
  }

  export type CharityApplicationsUpdateManyWithWhereWithoutCharityInput = {
    where: CharityApplicationsScalarWhereInput
    data: XOR<CharityApplicationsUpdateManyMutationInput, CharityApplicationsUncheckedUpdateManyWithoutCharityInput>
  }

  export type CharitySignupTokensUpsertWithWhereUniqueWithoutCharityInput = {
    where: CharitySignupTokensWhereUniqueInput
    update: XOR<CharitySignupTokensUpdateWithoutCharityInput, CharitySignupTokensUncheckedUpdateWithoutCharityInput>
    create: XOR<CharitySignupTokensCreateWithoutCharityInput, CharitySignupTokensUncheckedCreateWithoutCharityInput>
  }

  export type CharitySignupTokensUpdateWithWhereUniqueWithoutCharityInput = {
    where: CharitySignupTokensWhereUniqueInput
    data: XOR<CharitySignupTokensUpdateWithoutCharityInput, CharitySignupTokensUncheckedUpdateWithoutCharityInput>
  }

  export type CharitySignupTokensUpdateManyWithWhereWithoutCharityInput = {
    where: CharitySignupTokensScalarWhereInput
    data: XOR<CharitySignupTokensUpdateManyMutationInput, CharitySignupTokensUncheckedUpdateManyWithoutCharityInput>
  }

  export type DonationRequestUpsertWithWhereUniqueWithoutAnswering_charityInput = {
    where: DonationRequestWhereUniqueInput
    update: XOR<DonationRequestUpdateWithoutAnswering_charityInput, DonationRequestUncheckedUpdateWithoutAnswering_charityInput>
    create: XOR<DonationRequestCreateWithoutAnswering_charityInput, DonationRequestUncheckedCreateWithoutAnswering_charityInput>
  }

  export type DonationRequestUpdateWithWhereUniqueWithoutAnswering_charityInput = {
    where: DonationRequestWhereUniqueInput
    data: XOR<DonationRequestUpdateWithoutAnswering_charityInput, DonationRequestUncheckedUpdateWithoutAnswering_charityInput>
  }

  export type DonationRequestUpdateManyWithWhereWithoutAnswering_charityInput = {
    where: DonationRequestScalarWhereInput
    data: XOR<DonationRequestUpdateManyMutationInput, DonationRequestUncheckedUpdateManyWithoutAnswering_charityInput>
  }

  export type DonationsUpsertWithWhereUniqueWithoutAcceptedInput = {
    where: DonationsWhereUniqueInput
    update: XOR<DonationsUpdateWithoutAcceptedInput, DonationsUncheckedUpdateWithoutAcceptedInput>
    create: XOR<DonationsCreateWithoutAcceptedInput, DonationsUncheckedCreateWithoutAcceptedInput>
  }

  export type DonationsUpdateWithWhereUniqueWithoutAcceptedInput = {
    where: DonationsWhereUniqueInput
    data: XOR<DonationsUpdateWithoutAcceptedInput, DonationsUncheckedUpdateWithoutAcceptedInput>
  }

  export type DonationsUpdateManyWithWhereWithoutAcceptedInput = {
    where: DonationsScalarWhereInput
    data: XOR<DonationsUpdateManyMutationInput, DonationsUncheckedUpdateManyWithoutAcceptedInput>
  }

  export type ClothingItemsUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ClothingItemsWhereUniqueInput
    update: XOR<ClothingItemsUpdateWithoutOwnerInput, ClothingItemsUncheckedUpdateWithoutOwnerInput>
    create: XOR<ClothingItemsCreateWithoutOwnerInput, ClothingItemsUncheckedCreateWithoutOwnerInput>
  }

  export type ClothingItemsUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ClothingItemsWhereUniqueInput
    data: XOR<ClothingItemsUpdateWithoutOwnerInput, ClothingItemsUncheckedUpdateWithoutOwnerInput>
  }

  export type ClothingItemsUpdateManyWithWhereWithoutOwnerInput = {
    where: ClothingItemsScalarWhereInput
    data: XOR<ClothingItemsUpdateManyMutationInput, ClothingItemsUncheckedUpdateManyWithoutOwnerInput>
  }

  export type UserCreateWithoutApproved_applicationsInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
  }

  export type UserUncheckedCreateWithoutApproved_applicationsInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
  }

  export type UserCreateOrConnectWithoutApproved_applicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApproved_applicationsInput, UserUncheckedCreateWithoutApproved_applicationsInput>
  }

  export type UserCreateWithoutReviewed_applicationsInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
  }

  export type UserUncheckedCreateWithoutReviewed_applicationsInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
  }

  export type UserCreateOrConnectWithoutReviewed_applicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewed_applicationsInput, UserUncheckedCreateWithoutReviewed_applicationsInput>
  }

  export type CharitiesCreateWithoutApplicationsInput = {
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    signup_tokens?: CharitySignupTokensCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesUncheckedCreateWithoutApplicationsInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    signup_tokens?: CharitySignupTokensUncheckedCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestUncheckedCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsUncheckedCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesCreateOrConnectWithoutApplicationsInput = {
    where: CharitiesWhereUniqueInput
    create: XOR<CharitiesCreateWithoutApplicationsInput, CharitiesUncheckedCreateWithoutApplicationsInput>
  }

  export type UserUpsertWithoutApproved_applicationsInput = {
    update: XOR<UserUpdateWithoutApproved_applicationsInput, UserUncheckedUpdateWithoutApproved_applicationsInput>
    create: XOR<UserCreateWithoutApproved_applicationsInput, UserUncheckedCreateWithoutApproved_applicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApproved_applicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApproved_applicationsInput, UserUncheckedUpdateWithoutApproved_applicationsInput>
  }

  export type UserUpdateWithoutApproved_applicationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
  }

  export type UserUncheckedUpdateWithoutApproved_applicationsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type UserUpsertWithoutReviewed_applicationsInput = {
    update: XOR<UserUpdateWithoutReviewed_applicationsInput, UserUncheckedUpdateWithoutReviewed_applicationsInput>
    create: XOR<UserCreateWithoutReviewed_applicationsInput, UserUncheckedCreateWithoutReviewed_applicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewed_applicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewed_applicationsInput, UserUncheckedUpdateWithoutReviewed_applicationsInput>
  }

  export type UserUpdateWithoutReviewed_applicationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewed_applicationsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type CharitiesUpsertWithoutApplicationsInput = {
    update: XOR<CharitiesUpdateWithoutApplicationsInput, CharitiesUncheckedUpdateWithoutApplicationsInput>
    create: XOR<CharitiesCreateWithoutApplicationsInput, CharitiesUncheckedCreateWithoutApplicationsInput>
    where?: CharitiesWhereInput
  }

  export type CharitiesUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: CharitiesWhereInput
    data: XOR<CharitiesUpdateWithoutApplicationsInput, CharitiesUncheckedUpdateWithoutApplicationsInput>
  }

  export type CharitiesUpdateWithoutApplicationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    signup_tokens?: CharitySignupTokensUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesUncheckedUpdateWithoutApplicationsInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    signup_tokens?: CharitySignupTokensUncheckedUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUncheckedUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUncheckedUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesCreateWithoutSignup_tokensInput = {
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesUncheckedCreateWithoutSignup_tokensInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsUncheckedCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestUncheckedCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsUncheckedCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesCreateOrConnectWithoutSignup_tokensInput = {
    where: CharitiesWhereUniqueInput
    create: XOR<CharitiesCreateWithoutSignup_tokensInput, CharitiesUncheckedCreateWithoutSignup_tokensInput>
  }

  export type UserCreateWithoutCreated_invitesInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
  }

  export type UserUncheckedCreateWithoutCreated_invitesInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
  }

  export type UserCreateOrConnectWithoutCreated_invitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreated_invitesInput, UserUncheckedCreateWithoutCreated_invitesInput>
  }

  export type CharitiesUpsertWithoutSignup_tokensInput = {
    update: XOR<CharitiesUpdateWithoutSignup_tokensInput, CharitiesUncheckedUpdateWithoutSignup_tokensInput>
    create: XOR<CharitiesCreateWithoutSignup_tokensInput, CharitiesUncheckedCreateWithoutSignup_tokensInput>
    where?: CharitiesWhereInput
  }

  export type CharitiesUpdateToOneWithWhereWithoutSignup_tokensInput = {
    where?: CharitiesWhereInput
    data: XOR<CharitiesUpdateWithoutSignup_tokensInput, CharitiesUncheckedUpdateWithoutSignup_tokensInput>
  }

  export type CharitiesUpdateWithoutSignup_tokensInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesUncheckedUpdateWithoutSignup_tokensInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUncheckedUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUncheckedUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUncheckedUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserUpsertWithoutCreated_invitesInput = {
    update: XOR<UserUpdateWithoutCreated_invitesInput, UserUncheckedUpdateWithoutCreated_invitesInput>
    create: XOR<UserCreateWithoutCreated_invitesInput, UserUncheckedCreateWithoutCreated_invitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreated_invitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreated_invitesInput, UserUncheckedUpdateWithoutCreated_invitesInput>
  }

  export type UserUpdateWithoutCreated_invitesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
  }

  export type UserUncheckedUpdateWithoutCreated_invitesInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type UserCreateWithoutDonations_createdInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
  }

  export type UserUncheckedCreateWithoutDonations_createdInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
  }

  export type UserCreateOrConnectWithoutDonations_createdInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDonations_createdInput, UserUncheckedCreateWithoutDonations_createdInput>
  }

  export type CharitiesCreateWithoutDonations_receivedInput = {
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestCreateNestedManyWithoutAnswering_charityInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesUncheckedCreateWithoutDonations_receivedInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsUncheckedCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensUncheckedCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestUncheckedCreateNestedManyWithoutAnswering_charityInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesCreateOrConnectWithoutDonations_receivedInput = {
    where: CharitiesWhereUniqueInput
    create: XOR<CharitiesCreateWithoutDonations_receivedInput, CharitiesUncheckedCreateWithoutDonations_receivedInput>
  }

  export type DonationRequestCreateWithoutAccepted_donationInput = {
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    creator: UserCreateNestedOneWithoutDonation_requestsInput
    answering_charity?: CharitiesCreateNestedOneWithoutDonation_requests_answeredInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestUncheckedCreateWithoutAccepted_donationInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    answered_by?: number | null
    created_by: number
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonation_requestInput
  }

  export type DonationRequestCreateOrConnectWithoutAccepted_donationInput = {
    where: DonationRequestWhereUniqueInput
    create: XOR<DonationRequestCreateWithoutAccepted_donationInput, DonationRequestUncheckedCreateWithoutAccepted_donationInput>
  }

  export type ClothingItemsCreateWithoutDonationInput = {
    type: string
    size: string
    condition: string
    front_image_url: string
    back_image_url: string
    donation_request: DonationRequestCreateNestedOneWithoutClothingItemsInput
    donor: UserCreateNestedOneWithoutClothingItemsInput
    owner?: CharitiesCreateNestedOneWithoutClothingItemsInput
  }

  export type ClothingItemsUncheckedCreateWithoutDonationInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsCreateOrConnectWithoutDonationInput = {
    where: ClothingItemsWhereUniqueInput
    create: XOR<ClothingItemsCreateWithoutDonationInput, ClothingItemsUncheckedCreateWithoutDonationInput>
  }

  export type ClothingItemsCreateManyDonationInputEnvelope = {
    data: ClothingItemsCreateManyDonationInput | ClothingItemsCreateManyDonationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDonations_createdInput = {
    update: XOR<UserUpdateWithoutDonations_createdInput, UserUncheckedUpdateWithoutDonations_createdInput>
    create: XOR<UserCreateWithoutDonations_createdInput, UserUncheckedCreateWithoutDonations_createdInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDonations_createdInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDonations_createdInput, UserUncheckedUpdateWithoutDonations_createdInput>
  }

  export type UserUpdateWithoutDonations_createdInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
  }

  export type UserUncheckedUpdateWithoutDonations_createdInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type CharitiesUpsertWithoutDonations_receivedInput = {
    update: XOR<CharitiesUpdateWithoutDonations_receivedInput, CharitiesUncheckedUpdateWithoutDonations_receivedInput>
    create: XOR<CharitiesCreateWithoutDonations_receivedInput, CharitiesUncheckedCreateWithoutDonations_receivedInput>
    where?: CharitiesWhereInput
  }

  export type CharitiesUpdateToOneWithWhereWithoutDonations_receivedInput = {
    where?: CharitiesWhereInput
    data: XOR<CharitiesUpdateWithoutDonations_receivedInput, CharitiesUncheckedUpdateWithoutDonations_receivedInput>
  }

  export type CharitiesUpdateWithoutDonations_receivedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUpdateManyWithoutAnswering_charityNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesUncheckedUpdateWithoutDonations_receivedInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUncheckedUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUncheckedUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUncheckedUpdateManyWithoutAnswering_charityNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type DonationRequestUpsertWithoutAccepted_donationInput = {
    update: XOR<DonationRequestUpdateWithoutAccepted_donationInput, DonationRequestUncheckedUpdateWithoutAccepted_donationInput>
    create: XOR<DonationRequestCreateWithoutAccepted_donationInput, DonationRequestUncheckedCreateWithoutAccepted_donationInput>
    where?: DonationRequestWhereInput
  }

  export type DonationRequestUpdateToOneWithWhereWithoutAccepted_donationInput = {
    where?: DonationRequestWhereInput
    data: XOR<DonationRequestUpdateWithoutAccepted_donationInput, DonationRequestUncheckedUpdateWithoutAccepted_donationInput>
  }

  export type DonationRequestUpdateWithoutAccepted_donationInput = {
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    creator?: UserUpdateOneRequiredWithoutDonation_requestsNestedInput
    answering_charity?: CharitiesUpdateOneWithoutDonation_requests_answeredNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestUncheckedUpdateWithoutAccepted_donationInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    answered_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: IntFieldUpdateOperationsInput | number
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonation_requestNestedInput
  }

  export type ClothingItemsUpsertWithWhereUniqueWithoutDonationInput = {
    where: ClothingItemsWhereUniqueInput
    update: XOR<ClothingItemsUpdateWithoutDonationInput, ClothingItemsUncheckedUpdateWithoutDonationInput>
    create: XOR<ClothingItemsCreateWithoutDonationInput, ClothingItemsUncheckedCreateWithoutDonationInput>
  }

  export type ClothingItemsUpdateWithWhereUniqueWithoutDonationInput = {
    where: ClothingItemsWhereUniqueInput
    data: XOR<ClothingItemsUpdateWithoutDonationInput, ClothingItemsUncheckedUpdateWithoutDonationInput>
  }

  export type ClothingItemsUpdateManyWithWhereWithoutDonationInput = {
    where: ClothingItemsScalarWhereInput
    data: XOR<ClothingItemsUpdateManyMutationInput, ClothingItemsUncheckedUpdateManyWithoutDonationInput>
  }

  export type DonationsCreateWithoutRequestInput = {
    accepted_at?: Date | string
    creator: UserCreateNestedOneWithoutDonations_createdInput
    accepted: CharitiesCreateNestedOneWithoutDonations_receivedInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonationInput
  }

  export type DonationsUncheckedCreateWithoutRequestInput = {
    donation_id?: number
    created_by: number
    accepted_by: number
    accepted_at?: Date | string
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonationInput
  }

  export type DonationsCreateOrConnectWithoutRequestInput = {
    where: DonationsWhereUniqueInput
    create: XOR<DonationsCreateWithoutRequestInput, DonationsUncheckedCreateWithoutRequestInput>
  }

  export type UserCreateWithoutDonation_requestsInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutDonorInput
  }

  export type UserUncheckedCreateWithoutDonation_requestsInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutDonorInput
  }

  export type UserCreateOrConnectWithoutDonation_requestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDonation_requestsInput, UserUncheckedCreateWithoutDonation_requestsInput>
  }

  export type CharitiesCreateWithoutDonation_requests_answeredInput = {
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensCreateNestedManyWithoutCharityInput
    donations_received?: DonationsCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesUncheckedCreateWithoutDonation_requests_answeredInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsUncheckedCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensUncheckedCreateNestedManyWithoutCharityInput
    donations_received?: DonationsUncheckedCreateNestedManyWithoutAcceptedInput
    ClothingItems?: ClothingItemsUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type CharitiesCreateOrConnectWithoutDonation_requests_answeredInput = {
    where: CharitiesWhereUniqueInput
    create: XOR<CharitiesCreateWithoutDonation_requests_answeredInput, CharitiesUncheckedCreateWithoutDonation_requests_answeredInput>
  }

  export type ClothingItemsCreateWithoutDonation_requestInput = {
    type: string
    size: string
    condition: string
    front_image_url: string
    back_image_url: string
    donor: UserCreateNestedOneWithoutClothingItemsInput
    owner?: CharitiesCreateNestedOneWithoutClothingItemsInput
    donation?: DonationsCreateNestedOneWithoutClothingItemsInput
  }

  export type ClothingItemsUncheckedCreateWithoutDonation_requestInput = {
    clothing_id?: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id?: number | null
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsCreateOrConnectWithoutDonation_requestInput = {
    where: ClothingItemsWhereUniqueInput
    create: XOR<ClothingItemsCreateWithoutDonation_requestInput, ClothingItemsUncheckedCreateWithoutDonation_requestInput>
  }

  export type ClothingItemsCreateManyDonation_requestInputEnvelope = {
    data: ClothingItemsCreateManyDonation_requestInput | ClothingItemsCreateManyDonation_requestInput[]
    skipDuplicates?: boolean
  }

  export type DonationsUpsertWithoutRequestInput = {
    update: XOR<DonationsUpdateWithoutRequestInput, DonationsUncheckedUpdateWithoutRequestInput>
    create: XOR<DonationsCreateWithoutRequestInput, DonationsUncheckedCreateWithoutRequestInput>
    where?: DonationsWhereInput
  }

  export type DonationsUpdateToOneWithWhereWithoutRequestInput = {
    where?: DonationsWhereInput
    data: XOR<DonationsUpdateWithoutRequestInput, DonationsUncheckedUpdateWithoutRequestInput>
  }

  export type DonationsUpdateWithoutRequestInput = {
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutDonations_createdNestedInput
    accepted?: CharitiesUpdateOneRequiredWithoutDonations_receivedNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonationNestedInput
  }

  export type DonationsUncheckedUpdateWithoutRequestInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type UserUpsertWithoutDonation_requestsInput = {
    update: XOR<UserUpdateWithoutDonation_requestsInput, UserUncheckedUpdateWithoutDonation_requestsInput>
    create: XOR<UserCreateWithoutDonation_requestsInput, UserUncheckedCreateWithoutDonation_requestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDonation_requestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDonation_requestsInput, UserUncheckedUpdateWithoutDonation_requestsInput>
  }

  export type UserUpdateWithoutDonation_requestsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonorNestedInput
  }

  export type UserUncheckedUpdateWithoutDonation_requestsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonorNestedInput
  }

  export type CharitiesUpsertWithoutDonation_requests_answeredInput = {
    update: XOR<CharitiesUpdateWithoutDonation_requests_answeredInput, CharitiesUncheckedUpdateWithoutDonation_requests_answeredInput>
    create: XOR<CharitiesCreateWithoutDonation_requests_answeredInput, CharitiesUncheckedCreateWithoutDonation_requests_answeredInput>
    where?: CharitiesWhereInput
  }

  export type CharitiesUpdateToOneWithWhereWithoutDonation_requests_answeredInput = {
    where?: CharitiesWhereInput
    data: XOR<CharitiesUpdateWithoutDonation_requests_answeredInput, CharitiesUncheckedUpdateWithoutDonation_requests_answeredInput>
  }

  export type CharitiesUpdateWithoutDonation_requests_answeredInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUpdateManyWithoutCharityNestedInput
    donations_received?: DonationsUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutOwnerNestedInput
  }

  export type CharitiesUncheckedUpdateWithoutDonation_requests_answeredInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUncheckedUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUncheckedUpdateManyWithoutCharityNestedInput
    donations_received?: DonationsUncheckedUpdateManyWithoutAcceptedNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ClothingItemsUpsertWithWhereUniqueWithoutDonation_requestInput = {
    where: ClothingItemsWhereUniqueInput
    update: XOR<ClothingItemsUpdateWithoutDonation_requestInput, ClothingItemsUncheckedUpdateWithoutDonation_requestInput>
    create: XOR<ClothingItemsCreateWithoutDonation_requestInput, ClothingItemsUncheckedCreateWithoutDonation_requestInput>
  }

  export type ClothingItemsUpdateWithWhereUniqueWithoutDonation_requestInput = {
    where: ClothingItemsWhereUniqueInput
    data: XOR<ClothingItemsUpdateWithoutDonation_requestInput, ClothingItemsUncheckedUpdateWithoutDonation_requestInput>
  }

  export type ClothingItemsUpdateManyWithWhereWithoutDonation_requestInput = {
    where: ClothingItemsScalarWhereInput
    data: XOR<ClothingItemsUpdateManyMutationInput, ClothingItemsUncheckedUpdateManyWithoutDonation_requestInput>
  }

  export type DonationRequestCreateWithoutClothingItemsInput = {
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    accepted_donation?: DonationsCreateNestedOneWithoutRequestInput
    creator: UserCreateNestedOneWithoutDonation_requestsInput
    answering_charity?: CharitiesCreateNestedOneWithoutDonation_requests_answeredInput
  }

  export type DonationRequestUncheckedCreateWithoutClothingItemsInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    answered_by?: number | null
    created_by: number
    accepted_donation?: DonationsUncheckedCreateNestedOneWithoutRequestInput
  }

  export type DonationRequestCreateOrConnectWithoutClothingItemsInput = {
    where: DonationRequestWhereUniqueInput
    create: XOR<DonationRequestCreateWithoutClothingItemsInput, DonationRequestUncheckedCreateWithoutClothingItemsInput>
  }

  export type UserCreateWithoutClothingItemsInput = {
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutClothingItemsInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    is_verified: boolean
    first_name: string
    last_name: string
    created_on?: Date | string
    updated_on?: Date | string
    approved_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutApproverInput
    reviewed_applications?: CharityApplicationsUncheckedCreateNestedManyWithoutReviewerInput
    created_invites?: CharitySignupTokensUncheckedCreateNestedManyWithoutCreatorInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedCreateNestedManyWithoutUserInput
    PasswordResetTokens?: PasswordResetTokensUncheckedCreateNestedManyWithoutUserInput
    donation_requests?: DonationRequestUncheckedCreateNestedManyWithoutCreatorInput
    donations_created?: DonationsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutClothingItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClothingItemsInput, UserUncheckedCreateWithoutClothingItemsInput>
  }

  export type CharitiesCreateWithoutClothingItemsInput = {
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsCreateNestedManyWithoutAcceptedInput
  }

  export type CharitiesUncheckedCreateWithoutClothingItemsInput = {
    charity_id?: number
    name: string
    email: string
    phone: string
    address: string
    website: string
    verified?: boolean
    created_on?: Date | string
    updated_on?: Date | string
    password_hash?: string | null
    applications?: CharityApplicationsUncheckedCreateNestedManyWithoutCharityInput
    signup_tokens?: CharitySignupTokensUncheckedCreateNestedManyWithoutCharityInput
    donation_requests_answered?: DonationRequestUncheckedCreateNestedManyWithoutAnswering_charityInput
    donations_received?: DonationsUncheckedCreateNestedManyWithoutAcceptedInput
  }

  export type CharitiesCreateOrConnectWithoutClothingItemsInput = {
    where: CharitiesWhereUniqueInput
    create: XOR<CharitiesCreateWithoutClothingItemsInput, CharitiesUncheckedCreateWithoutClothingItemsInput>
  }

  export type DonationsCreateWithoutClothingItemsInput = {
    accepted_at?: Date | string
    creator: UserCreateNestedOneWithoutDonations_createdInput
    accepted: CharitiesCreateNestedOneWithoutDonations_receivedInput
    request: DonationRequestCreateNestedOneWithoutAccepted_donationInput
  }

  export type DonationsUncheckedCreateWithoutClothingItemsInput = {
    donation_id?: number
    donation_request_id: number
    created_by: number
    accepted_by: number
    accepted_at?: Date | string
  }

  export type DonationsCreateOrConnectWithoutClothingItemsInput = {
    where: DonationsWhereUniqueInput
    create: XOR<DonationsCreateWithoutClothingItemsInput, DonationsUncheckedCreateWithoutClothingItemsInput>
  }

  export type DonationRequestUpsertWithoutClothingItemsInput = {
    update: XOR<DonationRequestUpdateWithoutClothingItemsInput, DonationRequestUncheckedUpdateWithoutClothingItemsInput>
    create: XOR<DonationRequestCreateWithoutClothingItemsInput, DonationRequestUncheckedCreateWithoutClothingItemsInput>
    where?: DonationRequestWhereInput
  }

  export type DonationRequestUpdateToOneWithWhereWithoutClothingItemsInput = {
    where?: DonationRequestWhereInput
    data: XOR<DonationRequestUpdateWithoutClothingItemsInput, DonationRequestUncheckedUpdateWithoutClothingItemsInput>
  }

  export type DonationRequestUpdateWithoutClothingItemsInput = {
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    accepted_donation?: DonationsUpdateOneWithoutRequestNestedInput
    creator?: UserUpdateOneRequiredWithoutDonation_requestsNestedInput
    answering_charity?: CharitiesUpdateOneWithoutDonation_requests_answeredNestedInput
  }

  export type DonationRequestUncheckedUpdateWithoutClothingItemsInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    answered_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_donation?: DonationsUncheckedUpdateOneWithoutRequestNestedInput
  }

  export type UserUpsertWithoutClothingItemsInput = {
    update: XOR<UserUpdateWithoutClothingItemsInput, UserUncheckedUpdateWithoutClothingItemsInput>
    create: XOR<UserCreateWithoutClothingItemsInput, UserUncheckedCreateWithoutClothingItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClothingItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClothingItemsInput, UserUncheckedUpdateWithoutClothingItemsInput>
  }

  export type UserUpdateWithoutClothingItemsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutClothingItemsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approved_applications?: CharityApplicationsUncheckedUpdateManyWithoutApproverNestedInput
    reviewed_applications?: CharityApplicationsUncheckedUpdateManyWithoutReviewerNestedInput
    created_invites?: CharitySignupTokensUncheckedUpdateManyWithoutCreatorNestedInput
    EmailVerificationTokens?: EmailVerificationTokensUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetTokens?: PasswordResetTokensUncheckedUpdateManyWithoutUserNestedInput
    donation_requests?: DonationRequestUncheckedUpdateManyWithoutCreatorNestedInput
    donations_created?: DonationsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CharitiesUpsertWithoutClothingItemsInput = {
    update: XOR<CharitiesUpdateWithoutClothingItemsInput, CharitiesUncheckedUpdateWithoutClothingItemsInput>
    create: XOR<CharitiesCreateWithoutClothingItemsInput, CharitiesUncheckedCreateWithoutClothingItemsInput>
    where?: CharitiesWhereInput
  }

  export type CharitiesUpdateToOneWithWhereWithoutClothingItemsInput = {
    where?: CharitiesWhereInput
    data: XOR<CharitiesUpdateWithoutClothingItemsInput, CharitiesUncheckedUpdateWithoutClothingItemsInput>
  }

  export type CharitiesUpdateWithoutClothingItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUpdateManyWithoutAcceptedNestedInput
  }

  export type CharitiesUncheckedUpdateWithoutClothingItemsInput = {
    charity_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: CharityApplicationsUncheckedUpdateManyWithoutCharityNestedInput
    signup_tokens?: CharitySignupTokensUncheckedUpdateManyWithoutCharityNestedInput
    donation_requests_answered?: DonationRequestUncheckedUpdateManyWithoutAnswering_charityNestedInput
    donations_received?: DonationsUncheckedUpdateManyWithoutAcceptedNestedInput
  }

  export type DonationsUpsertWithoutClothingItemsInput = {
    update: XOR<DonationsUpdateWithoutClothingItemsInput, DonationsUncheckedUpdateWithoutClothingItemsInput>
    create: XOR<DonationsCreateWithoutClothingItemsInput, DonationsUncheckedCreateWithoutClothingItemsInput>
    where?: DonationsWhereInput
  }

  export type DonationsUpdateToOneWithWhereWithoutClothingItemsInput = {
    where?: DonationsWhereInput
    data: XOR<DonationsUpdateWithoutClothingItemsInput, DonationsUncheckedUpdateWithoutClothingItemsInput>
  }

  export type DonationsUpdateWithoutClothingItemsInput = {
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutDonations_createdNestedInput
    accepted?: CharitiesUpdateOneRequiredWithoutDonations_receivedNestedInput
    request?: DonationRequestUpdateOneRequiredWithoutAccepted_donationNestedInput
  }

  export type DonationsUncheckedUpdateWithoutClothingItemsInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsCreateManyApproverInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    reviewed_by?: number | null
    approved_on?: Date | string | null
    charity_id?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharityApplicationsCreateManyReviewerInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    approved_on?: Date | string | null
    approved_by?: number | null
    charity_id?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharitySignupTokensCreateManyCreatorInput = {
    invite_id?: number
    charity_id: number
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
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

  export type DonationRequestCreateManyCreatorInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    answered_by?: number | null
  }

  export type DonationsCreateManyCreatorInput = {
    donation_id?: number
    donation_request_id: number
    accepted_by: number
    accepted_at?: Date | string
  }

  export type ClothingItemsCreateManyDonorInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donation_id?: number | null
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type CharityApplicationsUpdateWithoutApproverInput = {
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewer?: UserUpdateOneWithoutReviewed_applicationsNestedInput
    charity?: CharitiesUpdateOneWithoutApplicationsNestedInput
  }

  export type CharityApplicationsUncheckedUpdateWithoutApproverInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    charity_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsUncheckedUpdateManyWithoutApproverInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    charity_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsUpdateWithoutReviewerInput = {
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approver?: UserUpdateOneWithoutApproved_applicationsNestedInput
    charity?: CharitiesUpdateOneWithoutApplicationsNestedInput
  }

  export type CharityApplicationsUncheckedUpdateWithoutReviewerInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    charity_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsUncheckedUpdateManyWithoutReviewerInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    charity_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharitySignupTokensUpdateWithoutCreatorInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    charity?: CharitiesUpdateOneRequiredWithoutSignup_tokensNestedInput
  }

  export type CharitySignupTokensUncheckedUpdateWithoutCreatorInput = {
    invite_id?: IntFieldUpdateOperationsInput | number
    charity_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharitySignupTokensUncheckedUpdateManyWithoutCreatorInput = {
    invite_id?: IntFieldUpdateOperationsInput | number
    charity_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type DonationRequestUpdateWithoutCreatorInput = {
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    accepted_donation?: DonationsUpdateOneWithoutRequestNestedInput
    answering_charity?: CharitiesUpdateOneWithoutDonation_requests_answeredNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestUncheckedUpdateWithoutCreatorInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    answered_by?: NullableIntFieldUpdateOperationsInput | number | null
    accepted_donation?: DonationsUncheckedUpdateOneWithoutRequestNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestUncheckedUpdateManyWithoutCreatorInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    answered_by?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DonationsUpdateWithoutCreatorInput = {
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    accepted?: CharitiesUpdateOneRequiredWithoutDonations_receivedNestedInput
    request?: DonationRequestUpdateOneRequiredWithoutAccepted_donationNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonationNestedInput
  }

  export type DonationsUncheckedUpdateWithoutCreatorInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    accepted_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationsUncheckedUpdateManyWithoutCreatorInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    accepted_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClothingItemsUpdateWithoutDonorInput = {
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
    donation_request?: DonationRequestUpdateOneRequiredWithoutClothingItemsNestedInput
    owner?: CharitiesUpdateOneWithoutClothingItemsNestedInput
    donation?: DonationsUpdateOneWithoutClothingItemsNestedInput
  }

  export type ClothingItemsUncheckedUpdateWithoutDonorInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsUncheckedUpdateManyWithoutDonorInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type CharityApplicationsCreateManyCharityInput = {
    application_id?: number
    org_name: string
    contact_name: string
    contact_email: string
    contact_number: string
    website: string
    org_address: string
    charity_number?: string | null
    status?: $Enums.Status
    reviewed_on?: Date | string | null
    reviewed_by?: number | null
    approved_on?: Date | string | null
    approved_by?: number | null
    created_on?: Date | string
    updated_on?: Date | string
  }

  export type CharitySignupTokensCreateManyCharityInput = {
    invite_id?: number
    email: string
    token: string
    expires_on: Date | string
    consumed_on?: Date | string | null
    created_on?: Date | string
    created_by?: number | null
  }

  export type DonationRequestCreateManyAnswering_charityInput = {
    donation_request_id?: number
    title: string
    created_on?: Date | string
    updated_on?: Date | string
    status?: $Enums.Status
    created_by: number
  }

  export type DonationsCreateManyAcceptedInput = {
    donation_id?: number
    donation_request_id: number
    created_by: number
    accepted_at?: Date | string
  }

  export type ClothingItemsCreateManyOwnerInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type CharityApplicationsUpdateWithoutCharityInput = {
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    approver?: UserUpdateOneWithoutApproved_applicationsNestedInput
    reviewer?: UserUpdateOneWithoutReviewed_applicationsNestedInput
  }

  export type CharityApplicationsUncheckedUpdateWithoutCharityInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityApplicationsUncheckedUpdateManyWithoutCharityInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    org_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_number?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    org_address?: StringFieldUpdateOperationsInput | string
    charity_number?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    reviewed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewed_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharitySignupTokensUpdateWithoutCharityInput = {
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutCreated_invitesNestedInput
  }

  export type CharitySignupTokensUncheckedUpdateWithoutCharityInput = {
    invite_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CharitySignupTokensUncheckedUpdateManyWithoutCharityInput = {
    invite_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_on?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DonationRequestUpdateWithoutAnswering_charityInput = {
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    accepted_donation?: DonationsUpdateOneWithoutRequestNestedInput
    creator?: UserUpdateOneRequiredWithoutDonation_requestsNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestUncheckedUpdateWithoutAnswering_charityInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_donation?: DonationsUncheckedUpdateOneWithoutRequestNestedInput
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonation_requestNestedInput
  }

  export type DonationRequestUncheckedUpdateManyWithoutAnswering_charityInput = {
    donation_request_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_on?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    created_by?: IntFieldUpdateOperationsInput | number
  }

  export type DonationsUpdateWithoutAcceptedInput = {
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutDonations_createdNestedInput
    request?: DonationRequestUpdateOneRequiredWithoutAccepted_donationNestedInput
    ClothingItems?: ClothingItemsUpdateManyWithoutDonationNestedInput
  }

  export type DonationsUncheckedUpdateWithoutAcceptedInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ClothingItems?: ClothingItemsUncheckedUpdateManyWithoutDonationNestedInput
  }

  export type DonationsUncheckedUpdateManyWithoutAcceptedInput = {
    donation_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    created_by?: IntFieldUpdateOperationsInput | number
    accepted_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClothingItemsUpdateWithoutOwnerInput = {
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
    donation_request?: DonationRequestUpdateOneRequiredWithoutClothingItemsNestedInput
    donor?: UserUpdateOneRequiredWithoutClothingItemsNestedInput
    donation?: DonationsUpdateOneWithoutClothingItemsNestedInput
  }

  export type ClothingItemsUncheckedUpdateWithoutOwnerInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsUncheckedUpdateManyWithoutOwnerInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsCreateManyDonationInput = {
    clothing_id?: number
    donation_request_id: number
    type: string
    size: string
    condition: string
    donor_id: number
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsUpdateWithoutDonationInput = {
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
    donation_request?: DonationRequestUpdateOneRequiredWithoutClothingItemsNestedInput
    donor?: UserUpdateOneRequiredWithoutClothingItemsNestedInput
    owner?: CharitiesUpdateOneWithoutClothingItemsNestedInput
  }

  export type ClothingItemsUncheckedUpdateWithoutDonationInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsUncheckedUpdateManyWithoutDonationInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    donation_request_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsCreateManyDonation_requestInput = {
    clothing_id?: number
    type: string
    size: string
    condition: string
    donor_id: number
    donation_id?: number | null
    owned_by?: number | null
    front_image_url: string
    back_image_url: string
  }

  export type ClothingItemsUpdateWithoutDonation_requestInput = {
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
    donor?: UserUpdateOneRequiredWithoutClothingItemsNestedInput
    owner?: CharitiesUpdateOneWithoutClothingItemsNestedInput
    donation?: DonationsUpdateOneWithoutClothingItemsNestedInput
  }

  export type ClothingItemsUncheckedUpdateWithoutDonation_requestInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
  }

  export type ClothingItemsUncheckedUpdateManyWithoutDonation_requestInput = {
    clothing_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    donor_id?: IntFieldUpdateOperationsInput | number
    donation_id?: NullableIntFieldUpdateOperationsInput | number | null
    owned_by?: NullableIntFieldUpdateOperationsInput | number | null
    front_image_url?: StringFieldUpdateOperationsInput | string
    back_image_url?: StringFieldUpdateOperationsInput | string
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