require("dotenv").config();

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "EASY",

    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",

    inputFormat:
      "The first line contains an integer n. The second line contains n space-separated integers. The third line contains the target integer.",

    outputFormat:
      "Print the two indices of the elements whose sum equals the target.",

    constraints:
      "2 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",

    examples: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: "3\n3 2 4\n6",
        output: "1 2",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// Write your solution here
`,

      python: `import sys

input = sys.stdin.readline

# Write your solution here
`,
    },

    testCases: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
      },
      {
        input: "3\n3 2 4\n6",
        output: "1 2",
      },
      {
        input: "2\n3 3\n6",
        output: "0 1",
      },
    ],
  },

  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "EASY",

    description:
      "Given a string s containing only the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if every opening bracket is closed by the same type of bracket and brackets are closed in the correct order.",

    inputFormat: "The input contains a single string s.",

    outputFormat: "Print true if the string is valid, otherwise print false.",

    constraints: "1 <= s.length <= 10^5\ns consists of parentheses only.",

    examples: [
      {
        input: "()[]{}",
        output: "true",
      },
      {
        input: "([)]",
        output: "false",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const s = fs.readFileSync(0, "utf8").trim();

// Write your solution here
`,

      python: `import sys

s = sys.stdin.readline().strip()

# Write your solution here
`,
    },

    testCases: [
      {
        input: "()[]{}",
        output: "true",
      },
      {
        input: "([)]",
        output: "false",
      },
      {
        input: "{[]}",
        output: "true",
      },
    ],
  },

  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "EASY",

    description:
      "Given a sorted array of integers nums and an integer target, return the index of target if it exists in the array. Otherwise, return -1.",

    inputFormat:
      "The first line contains n. The second line contains n sorted integers. The third line contains target.",

    outputFormat: "Print the index of target, or -1 if target does not exist.",

    constraints:
      "1 <= n <= 10^5\n-10^9 <= nums[i], target <= 10^9\nnums is sorted in ascending order.",

    examples: [
      {
        input: "6\n-1 0 3 5 9 12\n9",
        output: "4",
      },
      {
        input: "6\n-1 0 3 5 9 12\n2",
        output: "-1",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// Write your solution here
`,

      python: `import sys

input = sys.stdin.readline

# Write your solution here
`,
    },

    testCases: [
      {
        input: "6\n-1 0 3 5 9 12\n9",
        output: "4",
      },
      {
        input: "6\n-1 0 3 5 9 12\n2",
        output: "-1",
      },
    ],
  },

  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "MEDIUM",

    description:
      "Given an integer array nums, find the subarray with the largest sum and return its sum.",

    inputFormat:
      "The first line contains n. The second line contains n integers.",

    outputFormat: "Print the maximum possible subarray sum.",

    constraints: "1 <= n <= 10^5\n-10^4 <= nums[i] <= 10^4",

    examples: [
      {
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        output: "6",
      },
      {
        input: "1\n1",
        output: "1",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// Write your solution here
`,

      python: `import sys

input = sys.stdin.readline

# Write your solution here
`,
    },

    testCases: [
      {
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        output: "6",
      },
      {
        input: "5\n-1 -2 -3 -4 -5",
        output: "-1",
      },
    ],
  },

  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "EASY",

    description:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If no profit is possible, return 0.",

    inputFormat:
      "The first line contains an integer n. The second line contains n space-separated integers representing stock prices.",

    outputFormat: "Print the maximum profit that can be achieved.",

    constraints: "1 <= n <= 10^5\n0 <= prices[i] <= 10^5",

    examples: [
      {
        input: "5\n7 1 5 3 6",
        output: "5",
        explanation: "Buy at price 1 and sell at price 6.",
      },
      {
        input: "5\n7 6 4 3 1",
        output: "0",
        explanation: "No profitable transaction is possible.",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// Write your solution here
`,

      python: `import sys

input = sys.stdin.readline

# Write your solution here
`,
    },

    testCases: [
      {
        input: "5\n7 1 5 3 6",
        output: "5",
      },
      {
        input: "5\n7 6 4 3 1",
        output: "0",
      },
      {
        input: "6\n2 4 1 7 5 8",
        output: "7",
      },
    ],
  },

  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "EASY",

    description:
      "Given the head of a singly linked list, reverse the list and return the new head.",

    inputFormat:
      "The first line contains an integer n. The second line contains n space-separated integers representing the linked list.",

    outputFormat:
      "Print the elements of the reversed linked list separated by spaces.",

    constraints: "0 <= n <= 10^5\n-10^5 <= node value <= 10^5",

    examples: [
      {
        input: "5\n1 2 3 4 5",
        output: "5 4 3 2 1",
      },
      {
        input: "2\n1 2",
        output: "2 1",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;

    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// Write your solution here
`,

      python: `import sys

input = sys.stdin.readline

# Write your solution here
`,
    },

    testCases: [
      {
        input: "5\n1 2 3 4 5",
        output: "5 4 3 2 1",
      },
      {
        input: "2\n1 2",
        output: "2 1",
      },
      {
        input: "1\n10",
        output: "10",
      },
    ],
  },

  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "MEDIUM",

    description:
      "Given a string s, find the length of the longest substring without repeating characters.",

    inputFormat: "The input contains a single string s.",

    outputFormat:
      "Print the length of the longest substring without repeating characters.",

    constraints:
      "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",

    examples: [
      {
        input: "abcabcbb",
        output: "3",
        explanation: "The answer is abc.",
      },
      {
        input: "bbbbb",
        output: "1",
        explanation: "The answer is b.",
      },
      {
        input: "pwwkew",
        output: "3",
        explanation: "The answer is wke.",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const s = fs.readFileSync(0, "utf8").trim();

// Write your solution here
`,

      python: `import sys

s = sys.stdin.readline().strip()

# Write your solution here
`,
    },

    testCases: [
      {
        input: "abcabcbb",
        output: "3",
      },
      {
        input: "bbbbb",
        output: "1",
      },
      {
        input: "pwwkew",
        output: "3",
      },
      {
        input: "abcdef",
        output: "6",
      },
    ],
  },

  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "MEDIUM",

    description:
      "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i, j, and k are different indices and nums[i] + nums[j] + nums[k] equals zero. The solution must not contain duplicate triplets.",

    inputFormat:
      "The first line contains an integer n. The second line contains n space-separated integers.",

    outputFormat:
      "Print each unique triplet on a separate line. Print the elements of each triplet in non-decreasing order.",

    constraints: "3 <= n <= 3000\n-10^5 <= nums[i] <= 10^5",

    examples: [
      {
        input: "6\n-1 0 1 2 -1 -4",
        output: "-1 -1 2\n-1 0 1",
      },
      {
        input: "3\n0 0 0",
        output: "0 0 0",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\\n");

// Write your solution here
`,

      python: `import sys

input = sys.stdin.readline

# Write your solution here
`,
    },

    testCases: [
      {
        input: "6\n-1 0 1 2 -1 -4",
        output: "-1 -1 2\n-1 0 1",
      },
      {
        input: "3\n0 0 0",
        output: "0 0 0",
      },
      {
        input: "3\n1 2 -3",
        output: "-3 1 2",
      },
    ],
  },

  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.",

    difficulty: "MEDIUM",

    inputFormat:
      "The first line contains an integer n, the number of intervals. The next n lines each contain two integers start and end representing an interval [start, end].",

    outputFormat:
      "Print the merged non-overlapping intervals, one interval per line.",

    constraints: "1 <= n <= 10000\n0 <= start <= end <= 100000",

    examples: [
      {
        input: "4\n1 3\n2 6\n8 10\n15 18",
        output: "1 6\n8 10\n15 18",
        explanation:
          "The intervals [1,3] and [2,6] overlap, so they are merged into [1,6].",
      },
      {
        input: "2\n1 4\n4 5",
        output: "1 5",
        explanation:
          "The intervals [1,4] and [4,5] overlap at 4, so they are merged into [1,5].",
      },
    ],

    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<pair<int, int>> intervals(n);

    for (int i = 0; i < n; i++) {
        cin >> intervals[i].first >> intervals[i].second;
    }

    // Write your solution here

    return 0;
}`,

      javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);

let index = 0;

const n = input[index++];

const intervals = [];

for (let i = 0; i < n; i++) {
    const start = input[index++];
    const end = input[index++];

    intervals.push([start, end]);
}

// Write your solution here
`,

      python: `n = int(input())

intervals = []

for _ in range(n):
    start, end = map(int, input().split())
    intervals.append([start, end])

# Write your solution here
`,
    },

    testCases: [
      {
        input: "4\n1 3\n2 6\n8 10\n15 18",
        output: "1 6\n8 10\n15 18",
      },
      {
        input: "2\n1 4\n4 5",
        output: "1 5",
      },
      {
        input: "5\n1 4\n4 5\n6 8\n7 9\n10 12",
        output: "1 5\n6 9\n10 12",
      },
      {
        input: "3\n1 10\n2 3\n4 5",
        output: "1 10",
      },
      {
        input: "1\n5 8",
        output: "5 8",
      },
    ],
  },
];

const seed = async () => {
  console.log("Starting database seed...");

  for (const problem of problems) {
    await prisma.problem.upsert({
      where: {
        slug: problem.slug,
      },

      update: problem,

      create: problem,
    });

    console.log(`Seeded: ${problem.title}`);
  }

  console.log(`Seeded ${problems.length} problems.`);
  console.log("Database seed completed.");
};

seed()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
