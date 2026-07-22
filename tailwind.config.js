
const svgToDataUri = require("mini-svg-data-uri");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
/** @type {import('tailwindcss').Config} */

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
    	extend: {
    		/* Geometry is mechanical: every corner is exactly 90 degrees.
    		   Any stray `rounded-*` in legacy markup collapses to square. */
    		borderRadius: {
    			none: '0',
    			sm: '0',
    			DEFAULT: '0',
    			md: '0',
    			lg: '0',
    			xl: '0',
    			'2xl': '0',
    			'3xl': '0',
    			full: '0'
    		},
    		fontFamily: {
    			mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    			display: ['Archivo', '"Helvetica Neue"', 'sans-serif'],
    			sans: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
    		},
    		colors: {
    			void: '#0A0A0A',
    			steel: '#121212',
    			steel2: '#171717',
    			rule: '#262626',
    			rule2: '#3D3D3D',
    			phosphor: '#EAEAEA',
    			dim: '#8A8A8A',
    			faint: '#5A5A5A',
    			hazard: '#E61919',
    			hazard2: '#FF2A2A',
    			signal: '#4AF626'
    		},
    		animation: {
    			grid: 'grid 15s linear infinite',
    			orbit: 'orbit calc(var(--duration)*1s) linear infinite',
    			ticker: 'ticker 40s linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		keyframes: {
    			ticker: {
    				from: { transform: 'translateX(0)' },
    				to: { transform: 'translateX(-50%)' }
    			},
    			grid: {
    				'0%': {
    					transform: 'translateY(-50%)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			orbit: {
    				'0%': {
    					transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
    				},
    				'100%': {
    					transform: 'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		}
    	}
    },
	plugins: [
		require("tailwindcss-animate"),
		addVariablesForColors,
		function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"bg-dot-thick": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
						)}")`,
					}),
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
			);
		},
	],

}
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

