/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {highlightSymbol, mapSymbol, mapLegends} from './MapUtils.js';
import {Application} from '@maximo/maximo-js-api';

it('highlightSymbol should return the symbol to be used by the map', async () => {
     
    let status = 'PENDING';
    let highlightIcon = highlightSymbol(status);
    expect(highlightIcon.height).toBe(48);
    expect(highlightIcon.width).toBe(36);
    expect(highlightIcon.offsetx).toBe(13);
    expect(highlightIcon.offsety).toBe(24);
    expect(highlightIcon.url).toBeTruthy();
    
    status = 'INPROG';
    highlightIcon = highlightSymbol(status);
    expect(highlightIcon.height).toBe(48);
    expect(highlightIcon.width).toBe(36);
    expect(highlightIcon.offsetx).toBe(13);
    expect(highlightIcon.offsety).toBe(24);
    expect(highlightIcon.url).toBeTruthy();
    
    status =  'COMPLETED';
    highlightIcon = highlightSymbol(status);
    expect(highlightIcon.height).toBe(48);
    expect(highlightIcon.width).toBe(36);
    expect(highlightIcon.offsetx).toBe(13);
    expect(highlightIcon.offsety).toBe(24);
    expect(highlightIcon.url).toBeTruthy();
  

    status =  'CLUSTER';
    highlightIcon = highlightSymbol(status);
    expect(highlightIcon.height).toBe(36);
    expect(highlightIcon.width).toBe(36);
    expect(highlightIcon.offsetx).toBe(12);
    expect(highlightIcon.offsety).toBe(36);
    expect(highlightIcon.url).toBeTruthy();

    status = '';
    highlightIcon = highlightSymbol(status);
    expect(highlightIcon.height).toBe(48);
    expect(highlightIcon.width).toBe(36);
    expect(highlightIcon.offsetx).toBe(13);
    expect(highlightIcon.offsety).toBe(24);
    expect(highlightIcon.url).toBeTruthy();
}); 
  
it('mapSymbol should return the symbol to be used by the map', async () => {
     
    let status = 'PENDING';
    let symbol = mapSymbol(status);
    expect(symbol.height).toBe(48);
    expect(symbol.width).toBe(36);
    expect(symbol.offsetx).toBe(13);
    expect(symbol.offsety).toBe(24);
    expect(symbol.url).toBeTruthy();
  
    status = 'INPROG';
    symbol = mapSymbol(status);
    expect(symbol.height).toBe(48);
    expect(symbol.width).toBe(36);
    expect(symbol.offsetx).toBe(13);
    expect(symbol.offsety).toBe(24);
    expect(symbol.url).toBeTruthy();
    
    status =  'COMPLETED';
    symbol = mapSymbol(status);
    expect(symbol.height).toBe(48);
    expect(symbol.width).toBe(36);
    expect(symbol.offsetx).toBe(13);
    expect(symbol.offsety).toBe(24);
    expect(symbol.url).toBeTruthy();
  
    status =  'CLUSTER';
    symbol = mapSymbol(status);
    expect(symbol.height).toBe(36);
    expect(symbol.width).toBe(36);
    expect(symbol.offsetx).toBe(12);
    expect(symbol.offsety).toBe(36);
    expect(symbol.url).toBeTruthy();

    status = '';
    symbol = mapSymbol(status);
    expect(symbol.height).toBe(48);
    expect(symbol.width).toBe(36);
    expect(symbol.offsetx).toBe(13);
    expect(symbol.offsety).toBe(24);
    expect(symbol.url).toBeTruthy();
}); 

it('mapLegends to return correct values', async () => {
    const app = new Application();
    await app.initialize();

    const mockgetLocalizedLabel = jest.fn();
    app.getLocalizedLabel = mockgetLocalizedLabel;

    const clusterURL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgMzMgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cGluLWNsdXN0ZXI8L3RpdGxlPgogICAgPGcgaWQ9Ildvcmstb3JkZXIsLW1hcC12aWV3LSh1cGRhdGVkLXMzMykiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJwaW4tY2x1c3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5Ljk0OTgxMSwgLTE0LjUwMDUwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDAuMTM3NDYwNiwxNSBMNDAuMzAwOTU5NSwxNS4wMDE2MjA0IEM0Ni43MDMwOTgzLDE1LjA3ODA3ODcgNTEuOTExNjA2MSwyMC4yNDY5OTk5IDUyLDI2LjY4NTQxNzIgQzUxLjk5NzM4MDEsMjkuMDk3NjI5NiA1MS4yMzU1NjI5LDMxLjQ0NDQ0MTQgNDkuODI3NjU0MSwzMy4zOTUyNzUxIEw0OS42LDMzLjY5OTk2MjYgTDQwLDQ3LjcyOTA1MzUgTDM3LjQ3NzIyOTksNDQuMDQzIEw0My41NzgyMjk5LDM1LjEyNyBMNDMuNzcwOTYxMywzNC44NzE4MDI3IEM0NS41MDA0NjMzLDMyLjQ5NzAxMzEgNDYuNDM2ODAwNCwyOS42MzI3MzI1IDQ2LjQzOTk5ODYsMjYuNjg4MDY3MiBDNDYuMzczMDk5LDIxLjgwMzIxOTQgNDMuODg0NTg2OCwxNy41MzI1NTg3IDQwLjEzNzQ2MDYsMTUgWiBNNDQsMjYuNjg1NDE3MiBDNDMuOTk3MzgwMSwyOS4wOTc2Mjk2IDQzLjIzNTU2MjksMzEuNDQ0NDQxNCA0MS44Mjc2NTQxLDMzLjM5NTI3NTEgTDQxLjYsMzMuNjk5OTYyNiBMMzIsNDcuNzI5MDUzNSBMMjIuNCwzMy42OTk5NjI2IEMyMC44NDY3MzE1LDMxLjY5MTI5MzEgMjAuMDAyNzU3NywyOS4yMjQ1ODgxIDIwLDI2LjY4NTQxNzIgQzIwLjA4ODM5MzksMjAuMjQ2OTk5OSAyNS4yOTY5MDE3LDE1LjA3ODA3ODcgMzEuNjk5MDQwNSwxNS4wMDE2MjA0IEwzMiwxNS4wMDE3ODA4IEMzOC41MzkwODI0LDE0LjkxNjg1OTkgNDMuOTEwMjI1LDIwLjE0NjM5OTYgNDQsMjYuNjg1NDE3MiBaIiBpZD0iU2hhcGUiIGZpbGw9IiMzOTM5MzkiPjwvcGF0aD4KICAgICAgICAgICAgPGcgaWQ9Ik51bWJlci1vci1pY29uPyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEuNTAwMDAwLCAxNy4wMDAwMDApIj48L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';

    const clusterPinSize = {
        width: 44,
        height: 46,
        offsetx: 24,
        offsety: 36
    };
  
    const expected = {
      CLUSTER: {
        label: 'Cluster',
        url: clusterURL,
        ...clusterPinSize
      }
    };
  
    let legends = mapLegends(app);
  
    expect(legends[0]).toEqual(expected[0]);
  });



