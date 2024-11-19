export class KnexMock extends Function implements PromiseLike<unknown> {
  private data: unknown[] | string[] | number | unknown | undefined;

  constructor(options: {
    whereReturn?: unknown[],
    insertReturn?: unknown[],
    updateReturn?: unknown[],
  }) {
    super();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const closure = function (...options: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return closure._call(...options);
    };

    if (Object.keys(options).length > 1) {
      throw new Error('KnexMock: Cannot search, insert or update at the same query');
    }

    if (options.whereReturn) {
      this.data = options.whereReturn;
    } else if (options.insertReturn) {
      this.data = options.insertReturn;
    } else if (options.updateReturn) {
      this.data = options.updateReturn;
    }

    const newClojure = Object.setPrototypeOf(closure, new.target.prototype);
    newClojure._results = this.data;

    return newClojure as KnexMock;
  }

  public then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?: ((value: unknown) => TResult1 | PromiseLike<TResult1>) | null | undefined,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null | undefined,
  ): PromiseLike<TResult1 | TResult2> {
    this.data = true;
    return Promise.resolve(this.data).then(onfulfilled, onrejected);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _call(...args: unknown[]) {
    return this;
  }

  where(callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }
    return this;
  }

  insert(): KnexMock {
    return this;
  }

  update(): KnexMock {
    return this;
  }

  delete(): KnexMock {
    return this;
  }

  select(): KnexMock {
    return this;
  }

  join(): KnexMock {
    return this;
  }

  leftJoin(arg: string, callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }

    return this;
  }

  innerJoin(arg: string, callback?: (trx: KnexMock) => KnexMock): KnexMock {
    if (typeof callback === 'function') {
      callback.call(this, this);

      return this;
    }

    return this;
  }

  first(): KnexMock {
    if (this.data instanceof Array) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.data = this.data ? (this.data as any)[0] : undefined;
    }
    return this;
  }

}

export default KnexMock;

