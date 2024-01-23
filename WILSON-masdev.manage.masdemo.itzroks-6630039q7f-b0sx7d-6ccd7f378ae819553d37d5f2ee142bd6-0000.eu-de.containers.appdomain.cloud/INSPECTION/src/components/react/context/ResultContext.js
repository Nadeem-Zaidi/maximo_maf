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
 * ResultContext holds and provides inspection field results for each Inspection Result
 * Context provides both context to be wrapped in the scope 
 * that its going to be consumed and; the consumer which provides 
 * context value to be used by components.
 */
const ResultContext = React.createContext()

export const ResultProvider = ResultContext.Provider
export const ResultConsumer = ResultContext.Consumer

export default ResultContext
