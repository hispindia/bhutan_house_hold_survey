import { dataApi } from "@/api";
import * as orgUnitManager from "@/indexDB/OrganisationUnitManager/OrganisationUnitManager";
import { setSelectedParentOuPattern } from "@/redux/actions/data";
import { call, put, select } from "redux-saga/effects";

export function* getParentOuPatern() {
  const { offlineStatus } = yield select((state) => state.common);
  const {
    selectedOrgUnit: { id: orgUnit },
  } = yield select((state) => state.metadata); // handle parent nodes
  let randomNumber = Math.floor(100 + Math.random() * 900);

  // function extractValues(obj) {
  //     let values = [];
  //     if (obj.attributeValues) {
  //         values.push(...obj.attributeValues?.map(av => av?.value));
  //     }
  //     if (obj.parent) {
  //         values.push(...extractValues(obj.parent));
  //     }
  //     return values;
  // }

  function extractValues(obj) {
    let values = [];
    if (obj.parent) {
      values.push(...extractValues(obj.parent)); // Collect from parent first
    }
    if (obj.attributeValues) {
      values.push(...obj.attributeValues.map((av) => av?.value));
    }
    return values;
  }

  let parent = null;
  if (offlineStatus) {
    parent = yield call(orgUnitManager.getOrgWithParentsRecursive, {
      orgUnit,
    });

    parent = extractValues(parent);
    yield put(
      setSelectedParentOuPattern(parent?.join(" ") + " " + randomNumber)
    );
  } else {
    try {
      parent = yield call(dataApi.getParentsByOuId, orgUnit);

      parent = extractValues(parent);
      yield put(
        setSelectedParentOuPattern(parent?.join(" ") + " " + randomNumber)
      );
    } catch (error) {
      yield put(setSelectedParentOuPattern());
    }
  }

  return parent;
}
