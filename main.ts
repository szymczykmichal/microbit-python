function cnt_neigh(cur_x: number, cur_y: number): number {
    let led_cnt = 0
    if (led.point(cur_x, cur_y)) {
        led_cnt = led_cnt - 1
    }
    
    for (let x2 = cur_x - 1; x2 < cur_x + 2; x2++) {
        for (let y2 = cur_y - 1; y2 < cur_y + 2; y2++) {
            if (led.point(x2, y2)) {
                led_cnt += 1
            }
            
        }
    }
    return led_cnt
}

function rand_img() {
    basic.clearScreen()
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            if (Math.randomBoolean()) {
                led.plot(x, y)
            }
            
        }
    }
}

function is_ready_for_toggle(is_alive: boolean, cnt_: number): boolean {
    if (is_alive) {
        if (cnt_ < 2) {
            return true
        }
        
        if (cnt_ >= 2 && cnt_ <= 3) {
            return false
        }
        
        if (cnt_ > 3) {
            return true
        }
        
    } else if (cnt_ == 3) {
        return true
    }
    
    return false
}

function conawy_step() {
    let is_alive: boolean;
    let cnt_: number;
    let toggle_list = []
    for (let px = 0; px < 5; px++) {
        for (let py = 0; py < 5; py++) {
            is_alive = led.point(px, py)
            cnt_ = cnt_neigh(px, py)
            if (is_ready_for_toggle(is_alive, cnt_)) {
                toggle_list.push([px, py])
            }
            
        }
    }
    for (let points of toggle_list) {
        led.toggle(points[0], points[1])
    }
}

rand_img()
while (true) {
    if (input.buttonIsPressed(Button.A)) {
        conawy_step()
        basic.pause(300)
    }
    
    if (input.buttonIsPressed(Button.B)) {
        basic.clearScreen()
        led.plot(0, 1)
        led.plot(1, 1)
        led.plot(2, 1)
        basic.pause(300)
    }
    
    if (input.logoIsPressed()) {
        basic.clearScreen()
        rand_img()
        basic.pause(300)
    }
    
}
