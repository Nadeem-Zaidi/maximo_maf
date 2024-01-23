/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
class CategoryCommonController {

    pageInitialized(page, app) {
        this.app = app;
        this.page = page;
    }



    /**
     * Load data for the category datasource.
     * @param {*} parent The parent category to load subcategories. If not specified, will load top categories.
     * @returns The categories datasource
     */
    async loadCategoryDS(parent) {
        this.app.state.pageLoading = true;
        let categoryDS = this.app.findDatasource((parent)? "subcategoryds" : "allcategoryds");
        try {
            await categoryDS.initializeQbe();
            this.app.state.canLoad.categories = true;
            if (parent) {
                categoryDS.lastQuery.searchText=""; //Clear the user search
                categoryDS.setQBE('parent', '=', parent);
            } else {
                categoryDS.setQBE('parent', '=', 'null');
            }
            //istanbul ignore next
            if (this.app.state.isMobileContainer) {
                categoryDS.setQBE('usewithsr', true);
            } else if (!this.app.client.fakeClient) {
                //Attribute inside relationship does not work for device
                categoryDS.setQBE('classusewith.objectname', '=', 'SR');
            }
            await categoryDS.searchQBE(undefined, true);
        } finally {
            this.app.state.pageLoading = false;
        }
        return categoryDS;
    }



    async hasValidType(category) {
        //istanbul ignore next
        if (!category) {
            return false;
        }
        let typeValidationDS = this.app.datasources.typeValidationDS;
        await typeValidationDS.initializeQbe();
        typeValidationDS.setQBE("classstructureid", category.classstructureid);
        let items = await typeValidationDS.searchQBE(undefined, true);
        items = await this.filterTypes(items);
        return (items.length > 0);
    }



    async filterTypes(items) {
        const userOrgId = this.app.client.userInfo.defaultOrg;
        let filteredItems = [];
        // istanbul ignore next
        await items.forEach((item) => {
            if (!userOrgId || !item.orgid || item.orgid === userOrgId) {
                filteredItems.push(item);
            }
        });
        return filteredItems;
    }

} export default CategoryCommonController;