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

import InspectionsList from './InspectionsList';

describe('InspectionsList class test', () => {
  it('should create instance with default params', () => {
    expect(() => new InspectionsList()).not.toThrowError();
  });

  it('should accept other than array', () => {
    expect(new InspectionsList(1).size).toBe(1);
  });

  it('should indicate whether is last item in the queue', () => {
    const queue = new InspectionsList([1, 2]);
    expect(queue.isLast).toBe(false);
    queue.next();
    expect(queue.isLast).toBe(true);
  });

  it('should provide the size of queue', () => {
    expect(new InspectionsList().size).toBe(0);
    expect(new InspectionsList([1, 2, 3, 5]).size).toBe(4);
    expect(new InspectionsList(['a', 'b']).size).toBe(2);
  });

  it('should move forward', () => {
    const q = new InspectionsList(['a', 'b', 'c']);
    expect(q.currentPosition).toBe(1);
    expect(q.currentItem).toBe('a');
    q.next();
    expect(q.currentPosition).toBe(2);
    expect(q.currentItem).toBe('b');
    q.next();
    expect(q.currentPosition).toBe(3);
    expect(q.currentItem).toBe('c');
  });

  it('should not restart when in the tail', () => {
    const q = new InspectionsList([1, 2, 3]);
    expect(q.currentItem).toBe(1);
    q.next();
    q.next();
    q.next();
    q.next();
    expect(q.currentItem).toBe(3);
  });

  it('should compare itself with another array by position', () => {
    const q = new InspectionsList([1, 2, 3, 4]);
    expect(q.isEqual(1)).toBe(false); // it only compares with another array
    expect(q.isEqual([1, 2, 3])).toBe(false);
    expect(q.isEqual([1, 2, 4, 3])).toBe(false); // should be the same position
    expect(q.isEqual([1, 2, 3, 4])).toBe(true);
  });

  it('should serialize class instance to object', () => {
    const q1 = new InspectionsList(1).toJSON();
    expect(q1.queue.length).toBe(1);
  });
});
