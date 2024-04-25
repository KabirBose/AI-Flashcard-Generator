**Flashcards**

**Front:**
* What is the definition of a set?
* Provide examples of finite and infinite sets.
* Describe the empty set.

**Back:**
**Definition 1.1:** A set is a collection of distinct objects called elements. It can have a finite or infinite number of elements. The empty set consists of zero elements and is denoted by @.

**Examples:**
* {4,b,c,d} (finite set)
* Set of natural numbers (infinite set)
* Set of rational numbers (infinite set)
* Set of finite strings over {0,1} (infinite set)

**Front:**
* How do we describe a set as a list of conditions?
* Explain the set operations: union, intersection, difference, Cartesian product, power set.

**Back:**
**Describing a set as conditions:**
{x | x ∈ N and x > 5} (set of natural numbers greater than 5)

**Set operations:**
* Union (A ∪ B): Elements in A, B, or both.
* Intersection (A ∩ B): Elements in both A and B.
* Difference (A \ B): Elements in A but not in B.
* Cartesian product (A × B): Pairs (a,b) where a ∈ A and b ∈ B.
* Power set (P(A)): All subsets of A.

**Front:**
* What is a function?
* Explain the terms domain, codomain, range, and arity.

**Back:**
**Definition 1.2:** A function f : A → B is a mapping from elements in A (domain) to elements in B (codomain).

**Terms:**
* **Domain:** Set of possible inputs.
* **Codomain:** Set containing possible outputs.
* **Range:** Subset of codomain containing actual outputs.
* **Arity:** Number of inputs a function takes.

**Front:**
* What is a predicate?
* How are predicates related to sets?

**Back:**
**Definition:** A predicate is a function with a codomain of {True, False}.
* Predicates identify elements in a set that satisfy a condition.
* Sets can be defined by predicates.
* The predicate P(x) is True if x satisfies P.

**Front:**
* Define the size operator for sets.
* Explain the subset and equality operations for sets.

**Back:**
**Size operator:** |A| denotes the number of elements in A.
**Subset operation:** A ⊆ B if every element of A is also in B.
**Equality operation:** A = B if A ⊆ B and B ⊆ A.
A ⊂ B is a subset operation that excludes equality (every element of A is also in B).

**Front:**
* Describe the function Pred(x) in set form.
* Explain the difference between codomain and range.

**Back:**
**Pred(x) in set form:**
{{... , (-2,-3), (-1,-2), (0,-1), (1,0), (2,1), ...}}

**Codomain vs. Range:**
* Codomain: Set of all possible outputs.
* Range: Subset of codomain containing actual outputs.
* Range may not always be easy to describe.
* Range is always a subset of codomain.

**Front:**
* Define a binary function.
* What does "x satisfies P" mean?

**Back:**
**Binary Function:**
A function that takes two inputs.

**"x satisfies P":**
x is an element of the set {x | x ∈ A and P(x) = True}.
In other words, x satisfies the predicate P.

**Front:**
* How can we represent a set using conditions?
* What are the boolean set operations?

**Back:**
**Set Representation using Conditions:**
{x | condition} (e.g., {x | x ∈ N and x > 5})

**Boolean Set Operations:**
* Membership (x ∈ A)
* Non-membership (x ∉ A)
* Subset (A ⊆ B)
* Equality (A = B)

**Front:**
* Explain the notation used for Cartesian product and power set.
* What is the size relationship between a set and its power set?

**Back:**
**Cartesian Product:** A × B = {(a,b) | a ∈ A and b ∈ B}
**Power Set:** P(A) = {S | S ⊆ A}

**Size Relationship:** |P(A)| = 2|A|.
The power set of a set with n elements has 2