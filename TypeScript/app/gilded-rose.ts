export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  static MAX_QUALITY = 50;
  static EXCEPTIONAL_PRODUCTS = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'];
  static SURFURAS = 'Sulfuras, Hand of Ragnaros';
  static CONJURED = 'Conjured Mana Cake';

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!GildedRose.EXCEPTIONAL_PRODUCTS.includes(this.items[i].name)) {
        this.items[i] = this.reduceQuality(this.items[i]);
      } else {
        this.items[i] = this.updateQualityOfOtherProducts(this.items[i]);
      }
      if (this.items[i].name != GildedRose.SURFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      this.items[i] = this.checkSellInAndUpdateQuality(this.items[i]);
    }

    return this.items;
  }
  reduceQuality(item: Item): Item {
    if (item.quality > 0) {
      if (item.name != GildedRose.CONJURED) {
        item.quality == item.quality - 2;
      }
      else if (item.name != GildedRose.SURFURAS) {
        item.quality--;
      }
    }
    return item;
  }
  updateQualityOfOtherProducts(item: Item): Item {
    if (item.quality < GildedRose.MAX_QUALITY) {
      item.quality++;
      if (item.name == GildedRose.EXCEPTIONAL_PRODUCTS[1]) {
        item = this.increaseQualityForBackStage(item);
      }
    }
    return item;
  }
  increaseQualityForBackStage(item: Item): Item {
    if (item.sellIn < 11) {
      if (item.quality < GildedRose.MAX_QUALITY) {
        item.quality++;
      }
    }
    if (item.sellIn < 6) {
      if (item.quality < GildedRose.MAX_QUALITY) {
        item.quality++
      }
    }
    return item;
  }
  checkSellInAndUpdateQuality(item: Item): Item {
    if (item.sellIn < 0) {
      if (item.name != GildedRose.EXCEPTIONAL_PRODUCTS[0]) {
        if (item.name != GildedRose.EXCEPTIONAL_PRODUCTS[1]) {
          if (item.quality > 0) {
            if (item.name != GildedRose.SURFURAS) {
              item.quality = item.quality - 1
            }
          }
        } else {
          item.quality = 0;
        }
      } else {
        if (item.quality < GildedRose.MAX_QUALITY) {
          item.quality = item.quality + 1;
        }
      }
    }
    return item;
  }
}
