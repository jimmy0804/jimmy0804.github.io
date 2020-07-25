# Bit Manipulation

## Bitwise operators
### NOT `~`
Flip the bit
```
~0 = 1
~1 = 0
---
~01001 = 10110
```
### AND `&`
Only true if both input bits are true
```
0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1
```
### OR `|`
True if any input bit is true
```
0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1
```
### XOR `^`
True if one and only one input bit is true
```
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```
### Left Shift `<<`
Shift the binary digits by n, pad 0's on the right
Each shift is a multiply by 2 (unless overflow)
```
00010110 (22)
<<
00000010 (shift left for two bits)
=
01011000 (22 * 2 * 2 = 88)
```
### Right Shift `>>`
Shift the binary digits by n, pad 0's on the left
Each shift is a divide by 2 with round towards negative infinity
```
00010110 (22)
>>
00000010 (shift right for two bits)
=
00000101 (22 / 2 / 2 = 5)
```

## Basics
### Set bit
```Swift
func setBit(_ x: UInt8, _ position: UInt8) -> UInt8 {
  let mask = 1 << position
  return x | mask
}  
```
```
x = 0000 0110
position = 0000 0101
mask = 0000 0001 << 0000 0101 = 0010 0000
x | mask = 
0000 0110 |
0010 0000
---------
0010 0110
```