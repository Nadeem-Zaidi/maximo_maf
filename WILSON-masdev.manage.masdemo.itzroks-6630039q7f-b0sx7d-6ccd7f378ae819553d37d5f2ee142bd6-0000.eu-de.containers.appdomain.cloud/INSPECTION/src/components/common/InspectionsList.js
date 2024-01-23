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

/**
 * Manages list of inspection used for batch execution
 * Controlled list providing easy access to computed properties.
 */
class InspectionsList {
  constructor(queue = [], currentIndex = 0) {
    this.queue = Array.isArray(queue) ? queue : [queue];
    this.currentIndex = currentIndex;
  }

  get size() {
    return this.queue.length;
  }

  get isLast() {
    return this.queue.length && this.currentIndex === this.queue.length - 1;
  }

  get currentItem() {
    return this.queue[this.currentIndex];
  }

  get currentPosition() {
    return this.currentIndex + 1;
  }

  /**.
   * Set next item of queue
   *
   * @returns {*} current item of list
   */
  next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
    }
    return this.currentItem;
  }

  /**.
   * Compare array with queue by position
   *
   * @param {*} array
   * @returns {Boolean} comparison
   */
  isEqual(array) {
    let equal = true;
    if (!Array.isArray(array)) {
      return false;
    }
    // if length is not equal
    if (array.length !== this.size) {
      equal = false;
    } else {
      // comparing each element of array
      for (let i = 0; i < array.length; i++) {
        if (array[i] !== this.queue[i]) {
          equal = false;
        }
      }
    }
    return equal;
  }

  toJSON() {
    return {
      queue: this.queue,
      currentIndex: this.currentIndex,
      size: this.size,
      isLast: this.isLast,
      currentItem: this.currentItem,
      currentPosition: this.currentPosition
    };
  }
}

export default InspectionsList;
