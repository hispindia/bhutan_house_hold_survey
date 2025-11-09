import React, { useMemo } from 'react';
import withOrgUnitRequired from '../../hocs/withOrgUnitRequired';
import AddNewFamilyButton from '../../components/ControlBar/AddNewFamilyButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { changeTab } from '@/redux/actions/data';
import { LocalStorageTab } from '@/utils/localStorageManager';
const localTab= new LocalStorageTab();

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
        color: '#ED4734',
    },
}));

const AddNewFamilyButtonContainer = () => {
    const { programMetadata, selectedOrgUnit } = useSelector(
        (state) => state.metadata
    );
    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const isAssignedToOrg = useMemo(() => {
        return programMetadata?.organisationUnits?.find(
            (e) => e.id == selectedOrgUnit.id
        );
    }, [selectedOrgUnit]);

    const disabled = location.pathname === '/form' || !isAssignedToOrg;
    const onClick = () => {
        dispatch(changeTab(1));
        localTab.set(1)

        // if (!selectedOrgUnit || !isAssignedToOrg) return;
        // if (!programMetadata.organisationUnits.find((ou) => ou.id === selectedOrgUnit.id)) return;
        // tei.setSelectedTei(generateUid());
        // enr.setSelectedEnr(generateUid());
        // tei.isNew = true;
        // tei.isPass = false;
        history.replace(`/form`);
    };


    return (
        <AddNewFamilyButton
            isAssignedToOrg={isAssignedToOrg}
            onClick={onClick}
            disabled={disabled}
        >
            {t('addNewFamily')}
        </AddNewFamilyButton>
    );
};

export default withOrgUnitRequired()(AddNewFamilyButtonContainer);
