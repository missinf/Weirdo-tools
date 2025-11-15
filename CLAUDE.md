# Weirdo Tools

A collection of free ADHD tools. A lightweight React + Vite + TypeScript + Tailwind v3 + shadcn/ui web app with React Router. Super easy-to-use, lightweight and aesthetic.

#Layout
The 2 main top level nav areas I’ve thought of so far are: Tools, Saved, Help and Settings. Tools will have horizontally scrollable      
category shelves, and each category of tool will 3 to 6 tools. 
Saved will have tools you saved. 
Help could have: Brief explanation of what Weirdo Tools is
How to use the app
FAQ section
Credits/acknowledgments (including thanking existing Patreon members, and mentioning Patreon)


At the bottom of the Tools page, there will be two buttons: 
1.	One for Give me feedback 
2.	And the second one will be Donate
For new users, I'm thinking of putting a dismissal banner on the tools page, which just describes the page. Returning users won't see it. 

### Structure

* Modular hooks/utilities for reuse.
* Components in `src/components/`, each with a single responsibility.
* `src/config.ts` for non-color design tokens (spacing, durations, breakpoints, etc.)

### Style & UX

* Friendly, plain-language copy.
* Material Design principles (but no Material components required).
* Lucide React icons only.
* Fully responsive based on screen-width.
* Older-device friendly.
* Dark mode by default
* Prefer Shadcn components over custom.

**ADHD-Friendly Principles:**
* Show essential controls first; hide advanced options behind collapsible sections.
* Break complex processes into steps with clear progress indicators.
* Maximum 3-5 main actions visible at once.
* There will be no login system. Data stored locally in browser. 

**Visual Hierarchy:**
* Use semantic colors to guide attention: primary → secondary → muted.
* Break text into short paragraphs and bullet points.
* Use generous white space throughout.

**Interaction Patterns:**
* Auto-save user progress (no manual "Save" buttons).
* Provide immediate visual confirmation of actions.
* Maintain consistent layout structure across all tools.
* Use identical interaction patterns (buttons, inputs, controls).

**Typography & Accessibility:**
* Minimum 16px font size 
* Minimum 1.5 line height
* Maximum 65-75 characters per line.
* Minimum 44px tap targets for touch screens.
* Full keyboard navigation support. 


### Color System 

**Colors are centralized in `src/index.css` as CSS custom properties. Follow these rules:**

1. **ONLY use defined color utility classes:**
   - `text-primary`, `text-secondary`, `text-accent`, `text-muted-foreground`, `text-destructive`
   - `bg-background`, `bg-card`, `bg-accent`, `bg-primary`, `bg-secondary`, `bg-muted`
   - `border-border`, `border-input`, `border-primary`
   - See `src/index.css` for the complete list

2. **NEVER use arbitrary colors:**
   - ❌ NO: `text-red-500`, `bg-blue-600`, 'text-white'
   - ❌ NO: `style={{ color: '#ff0000' }}` or inline styles with hex/rgb colors
   - ❌ NO: hardcoded colors in JavaScript/TypeScript

3. **If you need a new color:**
   - Add it to `src/index.css` under both `:root` and `.dark` sections
   - Give it a semantic name (e.g., `--success`, `--warning`, `--info`)
   - Update Tailwind config if needed to expose the utility class

4. **Color consistency checklist:**
   - ✅ All colors come from `src/index.css`
   - ✅ Colors adapt to light/dark mode automatically
   - ✅ No hardcoded hex/rgb values anywhere in components
   - ✅ Use semantic color names, not literal colors
  - ✅ Always first try to find what color from the colors in src/index.css would best fit your requirements, based on how colors are used in rest of app.

### 8. **Internationalization (i18n)**
Even if English-only now, plan for it:
- No hardcoded strings
- Put all text in one place in src/copy.ts

### APIs

* **Groq API** for AI (store API key in environment variable `VITE_GROQ_API_KEY` in `.env` file)
- ** A development note (for the local project): File ops workaround**: Use complete absolute Windows paths (drive letters + backslashes) if write issues occur

### Dev Notes

* When asked for **options/ideas**, provide pros/cons with a recommendation (unless for copy — then give 5–10 options without pros/cons).
* Don't remove console logs unless I ask you explicitly.
* Do not violate color guidelines and DO NOT hard-code colors.
* Avoid web searches unless absolutely necessary and limit to only 1.