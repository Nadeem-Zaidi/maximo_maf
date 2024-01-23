/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import React from 'react';

/**
 * InspectionAssetLocationMetersContext holds and provides Meters
 * from Inspection Assets and Locations
 * context value to be used by components.
 */
const InspectionAssetLocationMetersContext = React.createContext();

export const MetersProvider = InspectionAssetLocationMetersContext.Provider;
export const MetersConsumer = InspectionAssetLocationMetersContext.Consumer;

export default InspectionAssetLocationMetersContext;
