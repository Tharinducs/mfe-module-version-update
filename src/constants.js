export const COUNTRIES = [
    { code: "my", label: "Malaysia" },
    { code: "sg", label: "Singapore" },
    { code: "gd", label: "Vietnam" },
    { code: "id", label: "Indonesia" },
    { code: "hk", label: "Hong Kong" },
];

export const RELEASE_TYPES = [
    { value: "bugfix", label: "Bugfix", color: "#1D9E75", bg: "#E1F5EE", desc: "bugfix/", prefix: "fix" },
    { value: "hotfix", label: "Hotfix", color: "#D85A30", bg: "#FAECE7", desc: "hotfix/", prefix: "hotfix" },
];

export const REPOS = [
    {
        id: 'idbweb',
        name: 'idbweb',
        description: "idbweb",
        isContainer: true,
        packagePaths: [
            {
                path: "package.json",
                label: "Root",
                dependencies: [
                    "@payment-web-app/fpx",
                    "ui-components"
                ],
            },
        ]
    },
    {
        id: "payment-web-app",
        name: "payment-web-app",
        description: "payment-web-app",
        isContainer: false,
        packagePaths: [
            {
                path: "package.json",
                label: "Root",
                dependencies: ["ui-components"],
            },
            {
                path: "packages/fpx/package.json",
                label: "Root",
                dependencies: ["ui-components"],
            },
        ],
    },
]