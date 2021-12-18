import { FieldReturnType, PropertiesToSource } from '../../../types/helperTypes';
import { DocumentData } from '../abstract/module.mjs';
import * as fields from '../data/fields.mjs';

interface PackageDependencyDataSchema extends DocumentSchema {
  name: typeof fields.REQUIRED_STRING;
  type: FieldReturnType<
    typeof fields.REQUIRED_STRING,
    {
      default: 'module';
      validate: (v: unknown) => boolean;
      validationError: 'Invalid package type "{value}" which must be a value from CONST.PACKAGE_TYPES';
    }
  >;
  manifest: typeof fields.STRING_FIELD;
}

interface PackageDependencyDataProperties {
  /** The dependency package name */
  name: string;

  /** The dependency package type, from CONST.PACKAGE_TYPES */
  type: foundry.CONST.PackageTypes;

  /** An explicit manifest URL, otherwise learned from the Foundry web server */
  manifest?: string;
}

interface PackageDependencyDataConstructorData {
  // TODO: somewhere, something has name marked as optional and/or | undefined...

  /** The dependency package name */
  name?: string;

  /** The dependency package type, from CONST.PACKAGE_TYPES */
  type?: foundry.CONST.PackageTypes | null;

  /** An explicit manifest URL, otherwise learned from the Foundry web server */
  manifest?: string | null;
}

/**
 * An inner data object which represents a single package dependency in the dependencies array.
 */
export declare class PackageDependencyData extends DocumentData<
  PackageDependencyDataSchema,
  PackageDependencyDataProperties,
  PropertiesToSource<PackageDependencyDataProperties>,
  PackageDependencyDataConstructorData
> {
  static defineSchema(): PackageDependencyDataSchema;

  /** @override */
  protected _getMissingFieldErrorMessage(name: string, field: DocumentField<unknown>): string;

  /** @override */
  protected _getInvalidFieldValueErrorMessage(name: string, field: DocumentField<unknown>, value: unknown): string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface PackageDependencyData extends PackageDependencyDataProperties {}
