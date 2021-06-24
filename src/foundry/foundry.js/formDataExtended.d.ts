/**
 * An extension of the native FormData implementation.
 *
 * This class functions the same way that the default FormData does, but it is more opinionated about how
 * input fields of certain types should be evaluated and handled.
 *
 * It also adds support for certain Foundry VTT specific concepts including:
 *  Support for defined data types and type conversion
 *  Support for TinyMCE editors
 *  Support for editable HTML elements
 *
 */
declare class FormDataExtended extends FormData {
  /**
   * @param form    - The form being processed
   * @param editors - An array of TinyMCE editor instances which are present in this form
   * @param dtypes  - A mapping of data types for form fields
   */
  constructor(
    form: HTMLFormElement,
    { editors, dtypes }: { editors?: FormDataExtended['editors']; dtypes?: FormDataExtended['dtypes'] }
  );

  /**
   * A mapping of data types requested for each form field
   * @defaultValue `{}`
   */
  dtypes: Record<string, string>;

  /**
   * A record of TinyMCE editors which are linked to this form
   * @defaultValue `[]`
   */
  editors: FormDataExtended.EditorTuple[];

  /**
   * Process the HTML form element to populate the FormData instance.
   * @param form - The HTML form
   */
  process(form: HTMLFormElement): void;

  /**
   * Export the FormData as an object
   */
  toObject(): Record<string, unknown>;
}

declare namespace FormDataExtended {
  type EditorTuple = [string, tinyMCE.Editor];
}
