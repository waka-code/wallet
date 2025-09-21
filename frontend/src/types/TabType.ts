export type TabType = 'register' | 'recharge' | 'balance' | 'payment' | 'confirm';
export interface TabConfig {
 id: TabType;
 label: string;
 icon: React.ReactNode;
 description: string;
}
