<?php

return [

    'required' => ':attribute は必須です。',
    'email' => ':attribute の形式が正しくありません。',
    'min' => [
        'string' => ':attribute は :min 文字以上で入力してください。',
    ],
    'regex' => ':attribute の形式が正しくありません。',

    'custom' => [
        'name' => [
            'regex' => '氏名はスペースなしで入力してください。',
        ],
        'furigana' => [
            'regex' => 'フリガナはカタカナ（スペースなし）で入力してください。',
        ],
    ],

    'attributes' => [
        'name' => '氏名',
        'furigana' => 'フリガナ',
        'email' => 'メールアドレス',
        'password' => 'パスワード',
    ],
];