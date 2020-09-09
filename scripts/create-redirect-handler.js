const { program } = require("commander");
const { Project, VariableDeclarationKind } = require("ts-morph");

const ROOT_HANDLER_DIR = "pages/api/";

// Update these as the default imports for api handler change.
const DEFAULT_NODE_IMPORTS = {
  next: ["NextApiRequest", "NextApiResponse"],
};

const DEFAULT_CUSTOM_IMPORTS = {
  "utils/info-builder/model": ["InfoBuilderDataFields"],
  "utils/info-builder": ["buildInfo"],
  "utils/auth": ["genGatekeeperUserInfo"],
};

const FUNC_HANDLER_BODY = `
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const gatekeeperResponse = await genGatekeeperUserInfo(
      req.cookies.accessToken
    );

    const queryParams = buildInfo(queryParamMapping, {
      gatekeeperData: gatekeeperResponse.data,
    });
    const redirectUrl = new URL(formUrl);
    // Add required query params based on build info object.
    Object.keys(queryParams).forEach((key) =>
      redirectUrl.searchParams.set(key, queryParams[key])
    );
    res.redirect(redirectUrl.toString());
  } catch (e) {
    return res.redirect(encodeURI(\`\${process.env.GATEKEEPER_URL}/login?r=\${req.url}\`));
  }
};
`;

program
  .version("1.0.0")
  .requiredOption(
    "-p, --path <path>",
    "path of the endpoint handled by the to-be-generated handler"
  )
  .parse(process.argv);

// All API handlers go into pages/api, which gives them a starting depth of 2.
const HANDLER_PATH_DEPTH =
  2 + program.path.split("/").filter((val) => val).length;

const project = new Project();
const sourceFile = project.createSourceFile(
  `${ROOT_HANDLER_DIR}${program.path}/index.ts`
);

// Emit all default imports.
Object.keys(DEFAULT_NODE_IMPORTS).forEach((moduleSpecifier) => {
  sourceFile.addImportDeclaration({
    namedImports: DEFAULT_NODE_IMPORTS[moduleSpecifier],
    moduleSpecifier,
  });
});

Object.keys(DEFAULT_CUSTOM_IMPORTS).forEach((moduleRootPath) => {
  const moduleSpecifier = "../".repeat(HANDLER_PATH_DEPTH) + moduleRootPath;
  sourceFile.addImportDeclaration({
    namedImports: DEFAULT_CUSTOM_IMPORTS[moduleRootPath],
    moduleSpecifier,
  });
});

// Emit constants to be manually set
sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  declarations: [
    {
      name: "formUrl",
    },
  ],
});
sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const,
  declarations: [
    {
      name: "queryParamMapping",
    },
  ],
});

// Emit handler func.
sourceFile.addStatements(FUNC_HANDLER_BODY);

sourceFile.saveSync();
