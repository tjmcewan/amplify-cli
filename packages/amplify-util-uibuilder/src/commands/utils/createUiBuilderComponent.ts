import { StudioTemplateRendererManager, StudioTemplateRendererFactory, StudioComponent } from '@aws-amplify/codegen-ui-orig';
import {
  AmplifyRenderer,
  ReactThemeStudioTemplateRenderer,
  ModuleKind,
  ScriptTarget,
  ScriptKind,
} from '@aws-amplify/codegen-ui-react-orig';
import { getUiBuilderComponentsPath } from './getUiBuilderComponentsPath';
import { printer } from 'amplify-prompts';
import { $TSContext } from 'amplify-cli-core';
import { createUiBuilderComponent as createUiBuilderComponentQ1, createUiBuilderTheme as createUiBuilderThemeQ1, generateAmplifyUiBuilderIndexFile as generateAmplifyUiBuilderIndexFileQ1} from './createUiBuilderComponentQ1';
const config = {
  module: ModuleKind.ES2020,
  target: ScriptTarget.ES2020,
  script: ScriptKind.JSX,
  renderTypeDeclarations: true,
};

const shouldUseQ1Release = (schema: any) => {
  return schema.schemaVersion && schema.schemaVersion == '1.0'
}

export const createUiBuilderComponent = (context: $TSContext, schema: any) => {
  if (shouldUseQ1Release(schema)) {
    return createUiBuilderComponentQ1(context, schema);
  }
  const uiBuilderComponentsPath = getUiBuilderComponentsPath(context);
  const rendererFactory = new StudioTemplateRendererFactory((component: StudioComponent) => new AmplifyRenderer(component, config));

  const outputPathDir = uiBuilderComponentsPath;
  const outputConfig = {
    outputPathDir,
  };

  const rendererManager = new StudioTemplateRendererManager(rendererFactory, outputConfig);

  rendererManager.renderSchemaToTemplate(schema);
  return schema;
};

export const createUiBuilderTheme = (context: $TSContext, schema: any) => {
  if (shouldUseQ1Release(schema)) {
    return createUiBuilderThemeQ1(context, schema);
  }
  const uiBuilderComponentsPath = getUiBuilderComponentsPath(context);
  const rendererFactory = new StudioTemplateRendererFactory((component: any) => new ReactThemeStudioTemplateRenderer(component, config));

  const outputPathDir = uiBuilderComponentsPath;
  const outputConfig = {
    outputPathDir,
  };

  const rendererManager = new StudioTemplateRendererManager(rendererFactory, outputConfig);

  try {
    rendererManager.renderSchemaToTemplate(schema);
    return schema;
  } catch (e) {
    printer.debug(e);
    printer.debug('Skipping invalid theme with schema');
    printer.debug(JSON.stringify(schema, null, 2));
    throw e;
  }
};

export const generateAmplifyUiBuilderIndexFile = (context: $TSContext, schemas: any[]) => {
    return generateAmplifyUiBuilderIndexFileQ1(context, schemas);
};
