import { ConstructorDataType, FieldReturnType, PropertiesToSource } from '../../../types/helperTypes';
import { DocumentData } from '../abstract/module.mjs';
import * as fields from '../data/fields.mjs';
import { PackageAuthorData } from './packageAuthorData';
import { PackageCompendiumData } from './packageCompendiumData';
import { PackageDependencyData } from './packageDependencyData';
import { PackageLanguageData } from './packageLanguageData';

/**
 * A helper field used for string arrays
 */
declare const STRING_ARRAY_FIELD: DocumentField<string[]> & {
  type: [String];
  required: true;
  default: [];
  clean: (v: unknown) => string[];
};

type IncludeArrayFieldReturnType<T extends ConstructorOf<DocumentData<any, any>>> = DocumentField<
  Array<InstanceType<T>>
> & {
  type: [T];
  required: true;
  default: [];
  clean: (v: unknown) => InstanceType<T>['_source'][];
};

/**
 * A helper field used for arrays of package include objects
 */
declare const INCLUDE_ARRAY_FIELD: <T extends ConstructorOf<DocumentData<any, any>>>(
  type: T
) => IncludeArrayFieldReturnType<T>;

export interface PackageDataSchema extends DocumentSchema {
  name: typeof fields.STRING_FIELD;
  title: typeof fields.STRING_FIELD;
  description: typeof fields.BLANK_STRING;
  author: typeof fields.STRING_FIELD;
  authors: IncludeArrayFieldReturnType<typeof PackageAuthorData>;
  url: typeof fields.STRING_FIELD;
  license: typeof fields.STRING_FIELD;
  readme: typeof fields.STRING_FIELD;
  bugs: typeof fields.STRING_FIELD;
  changelog: typeof fields.STRING_FIELD;
  flags: typeof fields.OBJECT_FIELD;
  version: FieldReturnType<typeof fields.REQUIRED_STRING, { default: '1.0.0' }>;
  minimumCoreVersion: typeof fields.STRING_FIELD;
  compatibleCoreVersion: typeof fields.STRING_FIELD;
  scripts: typeof STRING_ARRAY_FIELD;
  esmodules: typeof STRING_ARRAY_FIELD;
  styles: typeof STRING_ARRAY_FIELD;
  languages: IncludeArrayFieldReturnType<typeof PackageLanguageData>;
  packs: IncludeArrayFieldReturnType<typeof PackageCompendiumData>;
  system: typeof STRING_ARRAY_FIELD;
  dependencies: IncludeArrayFieldReturnType<typeof PackageDependencyData>;
  socket: FieldReturnType<typeof fields.BOOLEAN_FIELD, { default: false }>;
  manifest: typeof fields.STRING_FIELD;
  download: typeof fields.STRING_FIELD;
  protected: FieldReturnType<typeof fields.BOOLEAN_FIELD, { default: false }>;
}

export interface PackageDataProperties {
  /** The canonical package name, should be lower-case with no spaces or special characters */
  name: string;

  /** The human-readable package title, containing spaces and special characters */
  title?: string;

  /** An optional package description, may contain HTML */
  description: string;

  /** A singular package author; this is an old field staged for later deprecation, please use authors */
  author?: string;

  /**
   * An array of author objects who are co-authors of this package. Preferred to the singular author field.
   * @defaultValue `[]`
   */
  authors: PackageAuthorData[];

  /** A web url where more details about the package may be found */
  url?: string;

  /** A web url or relative file path where license details may be found */
  license?: string;

  /** A web url or relative file path where readme instructions may be found */
  readme?: string;

  /** A web url where bug reports may be submitted and tracked */
  bugs?: string;

  /** A web url where notes detailing package updates are available */
  changelog?: string;

  /** @defaultValue `{}` */
  flags: Record<string, unknown>;

  /**
   * The current package version
   * @defaultValue `'1.0.0'`
   */
  version: string;

  /** A minimum version of the core Foundry software which is required to use this package */
  minimumCoreVersion?: string;

  /** A maximum version of the core Foundry software beyond which compatibility is not guaranteed */
  compatibleCoreVersion?: string;

  /**
   * An array of urls or relative file paths for JavaScript files which should be included
   * @defaultValue `[]`
   */
  scripts: string[];

  /**
   * An array of urls or relative file paths for ESModule files which should be included
   * @defaultValue `[]`
   */
  esmodules: string[];

  /**
   * An array of urls or relative file paths for CSS stylesheet files which should be included
   * @defaultValue `[]`
   */
  styles: string[];

  /**
   * An array of language data objects which are included by this package
   * @defaultValue `[]`
   */
  languages: PackageLanguageData[];

  /**
   * An array of compendium packs which are included by this package
   * @defaultValue `[]`
   */
  packs: PackageCompendiumData[];

  /**
   * An array of game system names which this module supports
   * @defaultValue `[]`
   */
  system: string[];

  /**
   * An array of dependency objects which define required dependencies for using this package
   * @defaultValue `[]`
   */
  dependencies: PackageDependencyData[];

  /**
   * Whether to require a package-specific socket namespace for this package
   * @defaultValue `false`
   */
  socket: boolean;

  /** A publicly accessible web URL which provides the latest available package manifest file. Required in order to support module updates. */
  manifest?: string;

  /** A publicly accessible web URL where the source files for this package may be downloaded. Required in order to support module installation. */
  download?: string;

  /***
   * Whether this package uses the protected content access system.
   * @defaultValue `false`
   */
  protected: boolean;
}

export interface PackageDataConstructorData {
  /** The canonical package name, should be lower-case with no spaces or special characters */
  name?: string | null;

  /** The human-readable package title, containing spaces and special characters */
  title?: string | null;

  /** An optional package description, may contain HTML */
  description?: string | null;

  /** A singular package author; this is an old field staged for later deprecation, please use authors */
  author?: string | null;

  /**
   * An array of author objects who are co-authors of this package. Preferred to the singular author field.
   * @defaultValue `[]`
   */
  authors?: ConstructorDataType<PackageAuthorData>[] | null;

  /** A web url where more details about the package may be found */
  url?: string | null;

  /** A web url or relative file path where license details may be found */
  license?: string | null;

  /** A web url or relative file path where readme instructions may be found */
  readme?: string | null;

  /** A web url where bug reports may be submitted and tracked */
  bugs?: string | null;

  /** A web url where notes detailing package updates are available */
  changelog?: string | null;

  /** @defaultValue `{}` */
  flags?: Record<string, unknown> | null;

  /**
   * The current package version
   * @defaultValue `'1.0.0'`
   */
  version?: string | null;

  /** A minimum version of the core Foundry software which is required to use this package */
  minimumCoreVersion?: string | null;

  /** A maximum version of the core Foundry software beyond which compatibility is not guaranteed */
  compatibleCoreVersion?: string | null;

  /**
   * An array of urls or relative file paths for JavaScript files which should be included
   * @defaultValue `[]`
   */
  scripts?: string[] | null;

  /**
   * An array of urls or relative file paths for ESModule files which should be included
   * @defaultValue `[]`
   */
  esmodules?: string[] | null;

  /**
   * An array of urls or relative file paths for CSS stylesheet files which should be included
   * @defaultValue `[]`
   */
  styles?: string[] | null;

  /**
   * An array of language data objects which are included by this package
   * @defaultValue `[]`
   */
  languages?: ConstructorDataType<PackageLanguageData>[] | null;

  /**
   * An array of compendium packs which are included by this package
   * @defaultValue `[]`
   */
  packs?: ConstructorDataType<PackageCompendiumData>[] | null;

  /**
   * An array of game system names which this module supports
   * @defaultValue `[]`
   */
  system?: string[] | null;

  /**
   * An array of dependency objects which define required dependencies for using this package
   * @defaultValue `[]`
   */
  dependencies?: ConstructorDataType<PackageDependencyData>[] | null;

  /**
   * Whether to require a package-specific socket namespace for this package
   * @defaultValue `false`
   */
  socket?: boolean | null;

  /** A publicly accessible web URL which provides the latest available package manifest file. Required in order to support module updates. */
  manifest?: string | null;

  /** A publicly accessible web URL where the source files for this package may be downloaded. Required in order to support module installation. */
  download?: string | null;

  /***
   * Whether this package uses the protected content access system.
   * @defaultValue `false`
   */
  protected?: boolean | null;
}

/**
 * The data schema used to define a Package manifest.
 * Specific types of packages extend this schema with additional fields.
 */
export declare class PackageData<
  Schema extends Omit<PackageDataSchema, 'system'>,
  Properties extends Omit<PackageDataProperties, 'system'>,
  ConstructorData extends Omit<PackageDataConstructorData, 'system'>
> extends DocumentData<Schema, Properties, PropertiesToSource<PackageDataProperties>, ConstructorData> {
  static defineSchema(): Omit<PackageDataSchema, 'system'>;

  /** @override */
  _initializeSource(data: ConstructorData): PropertiesToSource<PackageDataProperties>;
}
