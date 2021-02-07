

<TextInputMask
    refInput={ref => { this.input = ref }}
    onChangeText={(formatted, extracted) => {
        console.log(formatted) // +1 (123) 456-78-90
        console.log(extracted) // 1234567890
    }}
    mask={"(+[000]) [0000] [0000]"}
/>