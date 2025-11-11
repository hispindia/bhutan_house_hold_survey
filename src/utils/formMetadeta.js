import { defaultProgramTrackedEntityAttributeDisable, HAS_INITIAN_NOVALUE } from "@/components/constants";
import _ from "lodash";
import { generateUid } from ".";

export const convertOriginMetadata = (programMetadataMember) => {
    programMetadataMember?.trackedEntityAttributes?.forEach((attr) => {
        attr.code = attr.id;
    });

    const programStagesDataElements = programMetadataMember?.programStages?.reduce(
        (acc, stage) => {
            stage?.dataElements?.forEach((de) => {
                de.code = de.id;
                de.hidden = HAS_INITIAN_NOVALUE.includes(de.id)

            });

            return [...acc, ...stage.dataElements];
        },
        []
    );

    return _.cloneDeep([
        ...programMetadataMember.trackedEntityAttributes,
        ...programStagesDataElements,
    ]);
};

export const convertAttributesToForm = (programMetadataMember) => {
    const { programSections, programStages } = programMetadataMember;

    let collectdAttributes = {}

    const mainMetaData = convertOriginMetadata(programMetadataMember)

    programSections.map((pSection) => {
        const trackedEntityAttributes = pSection.trackedEntityAttributes.map((tea) => tea.id);
        const TEIFormMetadata = mainMetaData.filter((f) => trackedEntityAttributes.includes(f.id))
            .sort((a, b) =>
                trackedEntityAttributes.indexOf(a.id) -
                trackedEntityAttributes.indexOf(b.id) || a.id.localeCompare(b.id)
            );

        collectdAttributes[pSection.displayName] = {
            hidden: false,
            fields: _.cloneDeep(TEIFormMetadata).reduce((obj, md) => {
                md.permanentDisabled = defaultProgramTrackedEntityAttributeDisable.includes(md.id);
                md.disabled = false;
                obj[md.code] = md;
                return obj;
            }, {}),
        }
    })

    // }

    // if (programStages?.some((pStage) => pStage.programStageSections.length === 0)) {
    //     programStages.map((pStage) => {
    //         const dataElements = pStage.dataElements.map((t) => t.id);
    //         const programFormMetadata = mainMetaData.filter((f) => dataElements.includes(f.id));
    //         // collectdAttributes.push(programFormMetadata)
    //     });
    // }

    programStages.map((pStage) => {
        const programStageSections = pStage?.programStageSections;
        return programStageSections.map((pSection) => {
            const dataElements = pSection.dataElements.map((tea) => tea.id);
            const programFormMetadata = mainMetaData.filter((f) => dataElements.includes(f.id)).sort((a, b) =>
                dataElements.indexOf(a.id) - dataElements.indexOf(b.id) ||
                a.id.localeCompare(b.id)
            );

            collectdAttributes[pSection.displayName] = {
                hidden: false,
                fields: _.cloneDeep(programFormMetadata).reduce((obj, md) => {
                    md.permanentDisabled = defaultProgramTrackedEntityAttributeDisable.includes(md.id);
                    md.disabled = false;
                    obj[md.code] = md;
                    return obj;
                }, {}),
            }

        });
    });

    // manage initial hide for NCD phase || module
    
    return collectdAttributes;
}

export const modifiedFormAttributesDisabledEnabled = (obj, boolValue) => {
    for (let sectyionKey in obj) {
        for (let filed in obj[sectyionKey]) {
            for (let ids in obj[sectyionKey][filed]) {
                obj[sectyionKey][filed][ids]['disabled'] = boolValue;
            }
        }
    }
    return _.cloneDeep(obj); // Ensures a deep copy (optional if not using lodash)
}