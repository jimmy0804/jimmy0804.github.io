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
Set a bit to 1 at position
```Swift
func setBit(_ x: UInt8, _ position: UInt8) -> UInt8 {
  let mask = 1 << position
  return x | mask
}  
```
Steps:
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

### Clear Bit
Clear a bit to 0 at position
```Swift
func clearBit(_ x: UInt8, _ position: UInt8) -> UInt8 {
  let mask = 1 << position
  return x & ~mask
}
```
steps:
```
x = 0010 0110
position = 0000 0101
mask = 0000 0001 << 0000 0101 = 0010 0000
~mask = 1101 1111

x & ~mask = 
0010 0110 &
1101 1111
---------
0000 0110
```

### Is Even
```Swift
func isEven(_ x: UInt8) -> Bool {
  (x & 1) == 0
}
```
steps:
```
x = 1110
x & 1 = 
1110 & 
0001
----
0000
```
### Is power of 2
```Swift
func isPowerOfTwo(_ x: UInt8) -> Bool {
  x & (x - 1) == 0
}
```
steps:
```
x = 1000
x - 1 = 0111

1000 &
0111
---------
0000
```
