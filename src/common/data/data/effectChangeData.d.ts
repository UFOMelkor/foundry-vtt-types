import { DocumentData } from '../../abstract/module';
import { BaseActiveEffect } from '../../documents';
import * as fields from '../fields';
import * as CONST from '../../constants';
import { PropertiesToSource } from '../../abstract/helperTypes';

interface ModeField extends DocumentField<number> {
  default: typeof CONST.ACTIVE_EFFECT_MODES.ADD;
  required: true;
  type: typeof Number;
  validate: (m: unknown) => boolean;
  validationError: 'Invalid mode specified for change in ActiveEffectData';
}

interface EffectChangeDataSchema extends DocumentSchema {
  key: typeof fields.BLANK_STRING;
  mode: ModeField;
  priority: typeof fields.NUMERIC_FIELD;
  value: typeof fields.BLANK_STRING;
}

interface EffectChangeDataProperties {
  /**
   * The attribute path in the Actor or Item data which the change modifies
   */
  key: string;

  /**
   * The modification mode with which the change is applied
   */
  mode: CONST.ActiveEffectMode;

  /**
   * The priority level with which this change is applied
   */
  priority: number;

  /**
   * The value of the change effect
   */
  value: string;
}

type EffectChangeDataSource = PropertiesToSource<EffectChangeDataProperties>;

/**
 * An embedded data structure which defines the structure of a change applied by an ActiveEffect.
 * @see ActiveEffectData
 */
export declare class EffectChangeData extends DocumentData<
  EffectChangeDataSchema,
  EffectChangeDataSource,
  BaseActiveEffect
> {
  static defineSchema(): EffectChangeDataSchema;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface EffectChangeData extends EffectChangeDataProperties {}