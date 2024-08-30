def cnt_neigh(cur_x: number, cur_y: number):
    led_cnt = 0
    if led.point(cur_x, cur_y):
        led_cnt = led_cnt - 1
    for x2 in range(cur_x-1, cur_x+2):
        for y2 in range(cur_y-1, cur_y+2):
            if led.point(x2, y2):
                led_cnt += 1
    return led_cnt

def rand_img():
    basic.clear_screen()
    for x in range(5):
        for y in range(5):
            if Math.random_boolean():
                led.plot(x, y)

def is_ready_for_toggle(is_alive, cnt_):
    if is_alive:
        if cnt_ < 2:
            return True
        if cnt_ >= 2 and cnt_ <= 3:
            return False
        if cnt_ > 3:
            return True
    else:
        if cnt_ == 3:
            return True
    return False

def conawy_step():
    toggle_list = []
    for px in range(5):
        for py in range(5):
            is_alive = led.point(px, py)
            cnt_ = cnt_neigh(px, py)
            if is_ready_for_toggle(is_alive, cnt_):
                toggle_list.append((px, py))

    for points in toggle_list:
        led.toggle(points[0], points[1])


rand_img()

while True:
    if input.button_is_pressed(Button.A):
        conawy_step()
        basic.pause(300)

    if input.button_is_pressed(Button.B):
        basic.clear_screen()
        led.plot(0,1)
        led.plot(1,1)
        led.plot(2,1)
        basic.pause(300)

    if input.logo_is_pressed():
        basic.clear_screen()
        rand_img()
        basic.pause(300)

