# Admin Dashboard UI Design System

## Color Palette
- **Primary**: Indigo-600 (#4F46E5)
- **Electric**: Custom electric blue (used for highlights)
- **Background**: White/Dark (midnight-900)
- **Borders**: Border (light gray)
- **Text**: Gray-900 (dark), White (light)

## Typography
- **Headings**: Font-black, uppercase, tracking-tight/wider
- **Body**: Font-bold/medium, text-sm/xs
- **Labels**: Font-black, text-[8px-10px], uppercase, tracking-[0.2em]

## Component Sizing
- **Cards**: Rounded-2xl, border-border, shadow-sm, hover:shadow-md
- **Buttons**: Rounded-xl, h-9/h-10/h-11, px-5/px-6, font-black, uppercase
- **Icons**: 14-20px for buttons, 12-16px for inline

## Spacing
- **Page Padding**: p-6 lg:p-8/p-10
- **Card Padding**: p-4/p-5, CardContent: p-4 pt-1
- **Grid Gaps**: gap-4 (cards), gap-6 (sections)

## Interactive States
- **Hover**: scale-105 for buttons, hover:shadow-md for cards, hover:bg-secondary
- **Active**: scale-95 for buttons
- **Focus**: focus:ring-4 focus:ring-primary/10

## Header Pattern
```
<div className="flex flex-col gap-4">
  <div>
    <p className="text-[10px] font-black text-muted-foreground/40 mb-1 uppercase tracking-[0.2em]">SECTION LABEL</p>
    <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Title: <span className="text-indigo-600">Highlight</span></h1>
    <p className="text-sm text-muted-foreground/60 italic mt-1 font-medium">Description with <span className="text-emerald-500 font-black">metrics</span></p>
  </div>
</div>
```

## Stats Card Pattern
```
<Card className="group overflow-hidden relative border-border bg-white dark:bg-midnight-900 rounded-2xl shadow-sm hover:shadow-md">
  <CardContent className="p-4">
    <div className="flex justify-between items-start mb-4">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
        <Icon size={18} />
      </div>
      <TrendIndicator />
    </div>
    <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">LABEL</h3>
    <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">VALUE</p>
  </CardContent>
</Card>
```

## Data Table Pattern
```
<div className="overflow-x-auto">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="border-b border-border bg-gray-50/30">
        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">COLUMN</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-50/50">
      {items.map((item) => (
        <tr className="group hover:bg-primary/[0.01] transition-all">
          <td className="px-6 py-4">Content</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## List Item Pattern
```
<div className="p-3 px-4 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors group cursor-pointer border border-transparent hover:border-border">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-color shadow-lg shadow-color/20" />
      <span className="font-bold text-[11px]">Item Name</span>
    </div>
    <span className="px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest bg-color text-white">Badge</span>
  </div>
</div>
```

## Load State Indicators
- Animating gradient bars
- Pulsing dots for live sync
- Fade-in animations on mount

## Responsive Breakpoints
- Mobile: Single column, full width
- Tablet (md): 2 columns for grids
- Desktop (lg): 3-4 columns for stats, 12-column grid for layouts
