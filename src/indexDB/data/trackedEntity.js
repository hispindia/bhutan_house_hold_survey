import { convertValueBack } from "@/utils";
import _ from "lodash";

const toDhis2Tei = (trackedEntity, teiData, enrs = []) => {
  let attributes = [];

  teiData.map((e) => {
    const reformatedValue = convertValueBack(e.valueType, e.value);

    attributes.push({
      attribute: e.attribute,
      value: reformatedValue,
      valueType: e.valueType,
      displayName: e.displayName,
    });
  });

  let { isOnline, orgUnit, isDeleted, trackedEntityType, updatedAt } = teiData[0];

  return {
    trackedEntity,
    trackedEntityType,
    enrollments: enrs,
    updatedAt,
    isOnline: isOnline,
    orgUnit: orgUnit,
    deleted: isDeleted,
    attributes,
  };
};

export const toDhis2TrackedEntities = (teis) => {
  if (!teis) return [];

  //  clean up duplicate tracked entities with same attribute and get which has value
  const cleanedTeis = _.uniqBy(teis, (e) => `${e.trackedEntity}-${e.attribute}-${e.value}`).filter((e) => e.value);
  let resTEIS = _.groupBy(cleanedTeis, "trackedEntity");

  console.log({ resTEIS, teis });

  return Object.entries(resTEIS).map(([trackedEntity, teiData]) => toDhis2Tei(trackedEntity, teiData));
};

export const toDhis2TrackedEntity = (tei, enrs = []) => {
  if (!tei) return null;
  let resTEIS = _.groupBy(tei, "trackedEntity");

  const formatedTei = Object.entries(resTEIS).map(([uid, teiData]) => {
    return toDhis2Tei(uid, teiData, enrs);
  });

  return formatedTei[0];
};
