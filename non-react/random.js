let i = 3
do {
  i--
  console.log('doing:', i)
}
while (i > 0)

// parts of loops can be omitted: for(;;) actually works

console.log(false == 0, 'should be true because of coercion?')