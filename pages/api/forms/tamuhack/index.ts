import { NextApiRequest, NextApiResponse } from "next";
import { InfoBuilderDataFields } from "../../../../utils/info-builder/model";
import { buildInfo } from "../../../../utils/info-builder";
import { genGatekeeperUserInfo } from "../../../../utils/auth";

const formUrl = "https://datathon.typeform.com/to/Rzw7PyAY";
const queryParamMapping = {
  "first": InfoBuilderDataFields.GATEKEEPER_FIRST_NAME,
  "last": InfoBuilderDataFields.GATEKEEPER_LAST_NAME,
  "email": InfoBuilderDataFields.GATEKEEPER_EMAIL,
};

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
    return res.redirect(encodeURI(`${process.env.GATEKEEPER_URL}/login?r=${req.url}`));
  }
};

