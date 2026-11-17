import type { Page } from '@playwright/test';

import { ChampionSection } from './sections/champion-section.ts';
import { AttributeSection } from './sections/attribute-section.ts';
import { EquipmentSection } from './sections/equipment-section.ts';
import { InventorySection } from './sections/inventory-section.ts';
import { TraitsSection } from './sections/traits-section.ts';

export class ChampionSheetPage {
  readonly page: Page;

  readonly championSection: ChampionSection;
  readonly attributeSection: AttributeSection;
  readonly equipmentSection: EquipmentSection;
  readonly inventorySection: InventorySection;
  readonly traitsSection: TraitsSection;

  constructor(page: Page) {
    this.page = page;

    this.championSection = new ChampionSection(page);
    this.attributeSection = new AttributeSection(page);
    this.equipmentSection = new EquipmentSection(page);
    this.inventorySection = new InventorySection(page);
    this.traitsSection = new TraitsSection(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
