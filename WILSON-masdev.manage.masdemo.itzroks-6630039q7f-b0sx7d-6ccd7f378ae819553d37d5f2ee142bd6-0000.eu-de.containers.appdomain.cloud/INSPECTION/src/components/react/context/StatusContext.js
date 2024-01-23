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

import React from 'react'

/**
 * StatusContext holds and provides ExecutionForm Status
 * from Select Inspection Form.
 * context value to be used by components.
 */
const StatusContext = React.createContext()

export const StatusProvider = StatusContext.Provider
export const StatusConsumer = StatusContext.Consumer

export default StatusContext
