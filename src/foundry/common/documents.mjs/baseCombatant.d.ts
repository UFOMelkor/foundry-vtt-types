import { DocumentMetadata } from '../abstract/document.mjs';
import { Document } from '../abstract/module.mjs';
import { BaseUser } from './baseUser';

/**
 * The base Combatant model definition which defines common behavior of an Combatant document between both client and server.
 */
export declare class BaseCombatant extends Document<any, any> {
  static get metadata(): Merge<
    DocumentMetadata,
    {
      name: 'Combatant';
      collection: 'combatants';
      label: 'DOCUMENT.Combatant';
      isEmbedded: true;
      permissions: {
        create: 'PLAYER';
        update: (user: BaseUser, doc: any, data: any) => boolean;
      };
    }
  >;
}
