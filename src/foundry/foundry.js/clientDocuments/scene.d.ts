import { ConfiguredDocumentClass, ConstructorDataType, PropertiesToSource } from '../../../types/helperTypes';
import Document, { DocumentModificationOptions } from '../../common/abstract/document.mjs';
import { AmbientLightDataProperties } from '../../common/data/data.mjs/ambientLightData';
import { AmbientSoundDataProperties } from '../../common/data/data.mjs/ambientSoundData';
import { DrawingDataProperties } from '../../common/data/data.mjs/drawingData';
import { MeasuredTemplateDataProperties } from '../../common/data/data.mjs/measuredTemplateData';
import { NoteDataProperties } from '../../common/data/data.mjs/noteData';
import { TileDataProperties } from '../../common/data/data.mjs/tileData';
import { TokenDataProperties } from '../../common/data/data.mjs/tokenData';
import { WallDataProperties } from '../../common/data/data.mjs/wallData';

declare global {
  /**
   * The client-side Scene document which extends the common BaseScene abstraction.
   * Each Scene document contains SceneData which defines its data schema.
   *
   * @see {@link data.SceneData}              The Scene data schema
   * @see {@link documents.Scenes}            The world-level collection of Scene documents
   * @see {@link applications.SceneConfig}    The Scene configuration application
   *
   */
  class Scene extends ClientDocumentMixin(foundry.documents.BaseScene) implements Document<any, any> {
    /**
     * @param data - Initial data provided to construct the Scene document
     */
    constructor(
      data: ConstructorParameters<typeof foundry.documents.BaseScene>[0],
      context?: ConstructorParameters<typeof foundry.documents.BaseScene>[1]
    );

    /**
     * Determine the canvas dimensions this Scene would occupy, if rendered
     * @defaultValue `{}`
     */
    dimensions: ReturnType<typeof Canvas.getDimensions> | {};

    /**
     * Track whether the scene is the active view
     */
    protected _view: this['data']['active'];

    /**
     * Track the viewed position of each scene (while in memory only, not persisted)
     * When switching back to a previously viewed scene, we can automatically pan to the previous position.
     * @defaultValue `{}`
     * @remarks This is intentionally public because it is used in Canvas._initializeCanvasPosition() and Canvas.pan()
     */
    _viewPosition: { x: number; y: number; scale: number } | {};

    /**
     * A convenience accessor for whether the Scene is currently active
     */
    get active(): this['data']['active'];

    /**
     * A convenience accessor for the background image of the Scene
     */
    get img(): this['data']['img'];

    /**
     * A convenience accessor for whether the Scene is currently viewed
     */
    get isView(): boolean;

    /**
     * A reference to the JournalEntry entity associated with this Scene, or null
     */
    get journal(): InstanceType<ConfiguredDocumentClass<typeof JournalEntry>> | null;

    /**
     * A reference to the Playlist entity for this Scene, or null
     */
    get playlist(): InstanceType<ConfiguredDocumentClass<typeof Playlist>> | null;

    /**
     * A reference to the PlaylistSound document which should automatically play for this Scene, if any
     */
    get playlistSound(): InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BasePlaylistSound>> | null;

    /**
     * Set this scene as currently active
     * @returns A Promise which resolves to the current scene once it has been successfully activated
     */
    activate(): Promise<this | undefined>;

    /**
     * Set this scene as the current view
     */
    view(): Promise<this | undefined>;

    /**
     * @override
     * @param createData - (default: `{}`)
     * @param options    - (default: `{}`)
     */
    clone(
      createData?: DeepPartial<
        | ConstructorDataType<foundry.data.SceneData>
        | (ConstructorDataType<foundry.data.SceneData> & Record<string, unknown>)
      >,
      options?: { save?: boolean; keepId?: boolean }
    ): TemporaryDocument<this> | Promise<TemporaryDocument<this | undefined>>;

    /** @override */
    prepareBaseData(): void;

    /** @override */
    protected _preCreate(
      data: ConstructorDataType<foundry.data.SceneData>,
      options: DocumentModificationOptions,
      user: foundry.documents.BaseUser
    ): Promise<void>;

    /** @override */
    protected _onCreate(
      data: foundry.data.SceneData['_source'],
      options: DocumentModificationOptions,
      userId: string
    ): void;

    /** @override */
    protected _preUpdate(
      changed: DeepPartial<ConstructorDataType<foundry.data.SceneData>>,
      options: DocumentModificationOptions,
      user: foundry.documents.BaseUser
    ): Promise<void>;

    /** @override */
    protected _onUpdate(changed: any, options: DocumentModificationOptions, userId: string): void;

    /** @override */
    protected _preDelete(options: DocumentModificationOptions, user: foundry.documents.BaseUser): Promise<void>;

    /** @override */
    protected _onDelete(options: DocumentModificationOptions, userId: string): void;

    /**
     * Handle Scene activation workflow if the active state is changed to true
     * @param active - Is the scene now active?
     */
    protected _onActivate(active: boolean): ReturnType<this['view']> | ReturnType<Canvas['draw']> | void;

    /** @override */
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.DrawingData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.TokenData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.AmbientLightData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.NoteData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.AmbientSoundData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.MeasuredTemplateData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.TileData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;
    _preCreateEmbeddedDocuments(
      embeddedName: string,
      result: ConstructorDataType<foundry.data.WallData>[],
      options: DocumentModificationOptions,
      userId: string
    ): void;

    /** @override */
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof DrawingDocument>>[],
      result: DeepPartial<PropertiesToSource<DrawingDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof TokenDocument>>[],
      result: DeepPartial<PropertiesToSource<TokenDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof AmbientLightDocument>>[],
      result: DeepPartial<PropertiesToSource<AmbientLightDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof NoteDocument>>[],
      result: DeepPartial<PropertiesToSource<NoteDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof AmbientSoundDocument>>[],
      result: DeepPartial<PropertiesToSource<AmbientSoundDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof MeasuredTemplateDocument>>[],
      result: DeepPartial<PropertiesToSource<MeasuredTemplateDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof TileDocument>>[],
      result: DeepPartial<PropertiesToSource<TileDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onCreateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof WallDocument>>[],
      result: DeepPartial<PropertiesToSource<WallDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;

    /** @override */
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<DrawingDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<TokenDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<AmbientLightDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<NoteDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<AmbientSoundDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<MeasuredTemplateDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<TileDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _preUpdateEmbeddedDocuments(
      embeddedName: string,
      result: DeepPartial<PropertiesToSource<WallDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;

    /** @override */
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof DrawingDocument>>[],
      result: DeepPartial<PropertiesToSource<DrawingDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof TokenDocument>>[],
      result: DeepPartial<PropertiesToSource<TokenDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof AmbientLightDocument>>[],
      result: DeepPartial<PropertiesToSource<AmbientLightDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof NoteDocument>>[],
      result: DeepPartial<PropertiesToSource<NoteDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof AmbientSoundDocument>>[],
      result: DeepPartial<PropertiesToSource<AmbientSoundDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof MeasuredTemplateDocument>>[],
      result: DeepPartial<PropertiesToSource<MeasuredTemplateDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof TileDocument>>[],
      result: DeepPartial<PropertiesToSource<TileDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onUpdateEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof WallDocument>>[],
      result: DeepPartial<PropertiesToSource<WallDataProperties>>[],
      options: DocumentModificationContext,
      userId: string
    ): void;

    /** @override */
    _preDeleteEmbeddedDocuments(
      embeddedName: string,
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;

    /** @override */
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof DrawingDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof TokenDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof AmbientLightDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof NoteDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof AmbientSoundDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof MeasuredTemplateDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof TileDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;
    _onDeleteEmbeddedDocuments(
      embeddedName: string,
      documents: InstanceType<ConfiguredDocumentClass<typeof WallDocument>>[],
      result: string[],
      options: DocumentModificationContext,
      userId: string
    ): void;

    /** @override */
    toCompendium(pack?: CompendiumCollection<CompendiumCollection.Metadata>): Omit<
      foundry.data.SceneData['_source'],
      '_id' | 'folder' | 'permission'
    > & {
      permission?: foundry.data.SceneData extends { toObject(): infer U } ? U : never;
    };

    /**
     * Create a 300px by 100px thumbnail image for this scene background
     * @param data - (default: `{}`)
     * @returns The created thumbnail data.
     */
    createThumbnail(data?: Partial<ThumbnailCreationData>): ReturnType<typeof ImageHelper['createThumbnail']>;
  }
}

interface ThumbnailCreationData {
  /**
   * A background image to use for thumbnail creation, otherwise the current scene
   * background is used.
   */
  img: string;

  /**
   * The desired thumbnail width. Default is 300px
   * @defaultValue `300`
   */
  width: number;

  /**
   * The desired thumbnail height. Default is 100px;
   * @defaultValue `100`
   */
  height: number;
}
