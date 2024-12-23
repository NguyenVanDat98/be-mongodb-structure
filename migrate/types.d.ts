// declare module "express-winston"{}

declare module "mongodb"{
    export declare class Db {
        static SYSTEM_NAMESPACE_COLLECTION: string;
        static SYSTEM_INDEX_COLLECTION: string;
        static SYSTEM_PROFILE_COLLECTION: string;
        static SYSTEM_USER_COLLECTION: string;
        static SYSTEM_COMMAND_COLLECTION: string;
        static SYSTEM_JS_COLLECTION: string;
        constructor(client: MongoClient, databaseName: string, options?: DbOptions);
        get databaseName(): string;
        get options(): DbOptions | undefined;
        get secondaryOk(): boolean;
        get readConcern(): ReadConcern | undefined;
        get readPreference(): ReadPreference;
        get bsonOptions(): BSONSerializeOptions;
        get writeConcern(): WriteConcern | undefined;
        get namespace(): string;
        get timeoutMS(): number | undefined;
        createCollection<TSchema extends Document = Document>(name: string, options?: CreateCollectionOptions): Promise<Collection<TSchema>>;
        command(command: Document, options?: RunCommandOptions): Promise<Document>;
        aggregate<T extends Document = Document>(pipeline?: Document[], options?: AggregateOptions): AggregationCursor<T>;
        admin(): Admin;
        collection<TSchema extends Document = Document>(name: string, options?: CollectionOptions): Collection<TSchema>;
        stats(options?: DbStatsOptions): Promise<Document>;
        listCollections(filter: Document, options: Exclude<ListCollectionsOptions, 'nameOnly'> & {
            nameOnly: true;
        }): ListCollectionsCursor<Pick<CollectionInfo, 'name' | 'type'>>;
        listCollections(filter: Document, options: Exclude<ListCollectionsOptions, 'nameOnly'> & {
            nameOnly: false;
        }): ListCollectionsCursor<CollectionInfo>;
        listCollections<T extends Pick<CollectionInfo, 'name' | 'type'> | CollectionInfo = Pick<CollectionInfo, 'name' | 'type'> | CollectionInfo>(filter?: Document, options?: ListCollectionsOptions): ListCollectionsCursor<T>;
        renameCollection<TSchema extends Document = Document>(fromCollection: string, toCollection: string, options?: RenameOptions): Promise<Collection<TSchema>>;
        dropCollection(name: string, options?: DropCollectionOptions): Promise<boolean>;
        dropDatabase(options?: DropDatabaseOptions): Promise<boolean>;
        collections(options?: ListCollectionsOptions): Promise<Collection[]>;
        createIndex(name: string, indexSpec: IndexSpecification, options?: CreateIndexesOptions): Promise<string>;
        removeUser(username: string, options?: RemoveUserOptions): Promise<boolean>;
        setProfilingLevel(level: ProfilingLevel, options?: SetProfilingLevelOptions): Promise<ProfilingLevel>;
        profilingLevel(options?: ProfilingLevelOptions): Promise<string>;
        indexInformation(name: string, options: IndexInformationOptions & {
            full: true;
        }): Promise<IndexDescriptionInfo[]>;
        indexInformation(name: string, options: IndexInformationOptions & {
            full?: false;
        }): Promise<IndexDescriptionCompact>;
        indexInformation(name: string, options: IndexInformationOptions): Promise<IndexDescriptionCompact | IndexDescriptionInfo[]>;
        indexInformation(name: string): Promise<IndexDescriptionCompact>;
        watch<TSchema extends Document = Document, TChange extends Document = ChangeStreamDocument<TSchema>>(pipeline?: Document[], options?: ChangeStreamOptions): ChangeStream<TSchema, TChange>;
        runCursorCommand(command: Document, options?: RunCursorCommandOptions): RunCommandCursor;
    }
}
