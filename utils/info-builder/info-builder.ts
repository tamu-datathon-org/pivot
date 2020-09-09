import { InfoBuilderDataFields, InfoBuilderData } from "./model";
import {get} from "lodash";

export const buildInfo = (
  infoKeyDataFieldMap: { [key: string]: InfoBuilderDataFields },
  data: InfoBuilderData
) => {
  const info: any = {};
  Object.keys(infoKeyDataFieldMap).forEach((key) => {
    // Lodash's object value getter supports nested keys like "gatekeeper.email".
    const dataVal = get(data, infoKeyDataFieldMap[key], undefined);
    if (dataVal) {
      info[key] = dataVal;
    }
  });
  return info;
};
