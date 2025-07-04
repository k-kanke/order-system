export function topLevelCategoryFromCode(categoryIdOrCode: string): 'ドリンク' | 'フード' | 'その他' {
    // 部門コードが "d" で始まる → ドリンク、"f" → フード
    if (categoryIdOrCode.startsWith('d')) {
      return 'ドリンク';
    } else if (categoryIdOrCode.startsWith('f')) {
      return 'フード';
    } else {
      return 'その他';
    }
  }